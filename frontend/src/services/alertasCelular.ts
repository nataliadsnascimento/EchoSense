
let camera: MediaStream | null = null;
let faixaVideo: MediaStreamTrack | null = null;

let alertaExecutando = false;
let cancelarAlerta = false;

type CapacidadesLanterna = MediaTrackCapabilities & {
    torch?: boolean;
};

type RestricaoLanterna = MediaTrackConstraintSet & {
    torch?: boolean;
};

const esperar = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function prepararLanterna(): Promise<boolean> {
    if (faixaVideo?.readyState === 'live') {
        return true;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
        return false;
    }

    let novaCamera: MediaStream | null = null;

    try {
        novaCamera = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: { ideal: 'environment' }
            }
        });

        const faixa = novaCamera.getVideoTracks()[0];

        if (!faixa) {
            novaCamera.getTracks().forEach(t => t.stop());
            return false;
        }

        const capacidades =
            faixa.getCapabilities() as CapacidadesLanterna;

        if (capacidades.torch !== true) {
            novaCamera.getTracks().forEach(t => t.stop());
            return false;
        }

        camera = novaCamera;
        faixaVideo = faixa;

        return true;
    } catch (erro) {
        novaCamera?.getTracks().forEach(t => t.stop());
        console.warn('Lanterna indisponível:', erro);
        return false;
    }
}

async function controlarLanterna(ligar: boolean): Promise<void> {
    if (!faixaVideo || faixaVideo.readyState !== 'live') {
        return;
    }

    const restricao: RestricaoLanterna = {
        torch: ligar
    };

    await faixaVideo.applyConstraints({
        advanced: [restricao]
    });
}

export async function dispararAlertaCelular(): Promise<void> {
    if (alertaExecutando) return;

    alertaExecutando = true;
    cancelarAlerta = false;

    try {

        if (typeof navigator.vibrate === 'function') {
            navigator.vibrate([250, 150, 250, 150, 400]);
        }


        if (faixaVideo?.readyState === 'live') {
            for (let i = 0; i < 3; i++) {
                if (cancelarAlerta) break;

                try {
                    await controlarLanterna(true);
                    await esperar(250);

                    await controlarLanterna(false);
                    await esperar(250);
                } catch (erro) {
                    console.warn('Falha ao piscar lanterna:', erro);
                    break;
                }
            }
        }
    } finally {
        try {
            await controlarLanterna(false);
        } catch {
        }

        alertaExecutando = false;
    }
}

export async function desligarAlertasCelular(): Promise<void> {
    cancelarAlerta = true;

    if (typeof navigator.vibrate === 'function') {
        navigator.vibrate(0);
    }

    try {
        await controlarLanterna(false);
    } catch {
    }

    camera?.getTracks().forEach(t => t.stop());

    camera = null;
    faixaVideo = null;
}
