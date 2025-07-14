// src/lib/gtag.ts

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';


declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}


// Enviar un evento con nombre y parámetros personalizados
export const event = (
  action: string,
  params: Record<string, any> = {}
): void => {
  if (
    !GA_ID ||
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', action, {
    ...params,
  });
};

// Alias para cambiarle "nombre" a un evento desde tu lógica
// Ejemplo: mapear 'llegada_web' -> 'inicio_experiencia_kasa'
const eventAliases: Record<string, string> = {
  llegada_web: 'inicio_experiencia_kasa',
  registro_cuenta: 'registro_usuario_exitoso',
  click_invertir: 'click_boton_invertir',
  pago_completado: 'inversion_confirmada_exitosamente',
  inicio_kyc: 'inicio_verificacion_identidad',
  kyc_completo: 'verificacion_identidad_completada',
  inicio_firma_contrato: 'inicio_firma_digital_contrato',
  firma_contrato_completado: 'firma_digital_contrato_completada',
  inicio_pago: 'inicio_proceso_transferencia_bancaria',
  uso_simulador: 'interaccion_simulador_inversion',
};

// Dispara evento con alias aplicado
export const track = (
  rawEventName: string,
  params: Record<string, any> = {}
): void => {
  const actualName = eventAliases[rawEventName] || rawEventName;
  event(actualName, params);
};
