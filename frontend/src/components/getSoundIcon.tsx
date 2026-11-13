import React from 'react';
import { Bell, Baby, AlertTriangle, DoorClosed, Dog, Volume2 } from 'lucide-react';

export function getSoundIcon(soundName?: string, size: number = 22) {
    const name = String(soundName || '').toLowerCase();

    if (name.includes('campainha')) {
        return <Bell size={size} />;
    }
    if (name.includes('bebê') || name.includes('bebe') || name.includes('choro')) {
        return <Baby size={size} />;
    }
    if (name.includes('incêndio') || name.includes('fogo') || name.includes('alarme')) {
        return <AlertTriangle size={size} />;
    }
    if (name.includes('cão') || name.includes('cachorro') || name.includes('latido')) {
        return <Dog size={size} />;
    }
    if (name.includes('porta') || name.includes('batida')) {
        return <DoorClosed size={size} />;
    }

    return <Volume2 size={size} />;
}