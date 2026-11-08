package exception;

import com.echosense.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ResourceNotFoundExceptionTest {

    @Test
    void deveManterMensagemDaExcecao() {

        ResourceNotFoundException exception =
                new ResourceNotFoundException("Evento não encontrado");

        assertEquals(
                "Evento não encontrado",
                exception.getMessage()
        );
    }
}