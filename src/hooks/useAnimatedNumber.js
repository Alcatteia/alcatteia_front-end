// src/hooks/useAnimatedNumber.js

import { useState, useEffect, useRef } from 'react';

export function useAnimatedNumber(targetValue, duration = 2000) { 
  const [currentValue, setCurrentValue] = useState(targetValue);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const previousTargetValueRef = useRef(targetValue); // Referência ao valor alvo anterior

  useEffect(() => {
    // Converte targetValue para número e garante que está entre 0 e 100, se for uma porcentagem
    const numericTargetValue = typeof targetValue === 'number' && !isNaN(targetValue)
      ? Math.max(0, Math.min(100, targetValue)) // Garante que a porcentagem esteja entre 0 e 100
      : 0; // Valor padrão se não for um número válido

    // Converte o valor de onde a animação deve começar
    const startValue = typeof previousTargetValueRef.current === 'number' && !isNaN(previousTargetValueRef.current)
      ? Math.max(0, Math.min(100, previousTargetValueRef.current))
      : 0;

    // Se o valor alvo numérico é o mesmo que o valor atual do estado, não há necessidade de animar
    if (numericTargetValue === currentValue) {
      previousTargetValueRef.current = numericTargetValue;
      return;
    }
    
    // Cancela qualquer animação anterior para iniciar uma nova suavemente
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    startTimeRef.current = null; // Reseta o tempo de início para a nova animação

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1); // Garante que o progresso não exceda 1

      const animatedValue = startValue + (numericTargetValue - startValue) * progress;
      setCurrentValue(Math.round(animatedValue)); // Arredonda para o número inteiro mais próximo

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animação concluída: define o valor final exatamente como o alvo
        setCurrentValue(numericTargetValue);
        previousTargetValueRef.current = numericTargetValue; // Atualiza a referência para o próximo ciclo
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Função de limpeza para cancelar a animação se o componente for desmontado ou o targetValue mudar
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Se a animação foi interrompida antes de terminar, o próximo 'startValue' deve ser o valor atual animado
      previousTargetValueRef.current = currentValue; 
    };
  }, [targetValue, duration]); // Dependências do useEffect

  // Efeito para garantir que previousTargetValueRef.current é atualizado se o componente
  // for montado com um valor diferente ou o targetValue inicial mudar de forma inesperada.
  useEffect(() => {
    previousTargetValueRef.current = targetValue;
  }, [targetValue]);


  return currentValue;
}