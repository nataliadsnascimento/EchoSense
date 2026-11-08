package com.echosense.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    @Test
    void deveRetornar404QuandoRecursoNaoForEncontrado() {

        GlobalExceptionHandler handler = new GlobalExceptionHandler();

        ResourceNotFoundException exception =
                new ResourceNotFoundException("Evento não encontrado");

        HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);

        org.mockito.Mockito.when(request.getRequestURI())
                .thenReturn("/eventos/1");

        ResponseEntity<StandardError> response =
                handler.resourceNotFound(exception, request);

        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("Evento não encontrado", response.getBody().getMessage());
        assertEquals("Resource not found", response.getBody().getError());
    }
}