document.addEventListener('DOMContentLoaded', () => {
  const animationBox = document.getElementById('animationBox');
  const animationSelect = document.getElementById('animationSelect');
  const fasterCheckbox = document.getElementById('fasterCheckbox');
  const slowerCheckbox = document.getElementById('slowerCheckbox');
  const delaySelect = document.getElementById('delaySelect');
  const repeatSelect = document.getElementById('repeatSelect');
  const applyButton = document.getElementById('applyAnimation');
  const resetButton = document.getElementById('resetAnimation');

  // Lista de todas as classes de animação disponíveis nas fontes
  // Esta lista foi construída a partir da sua documentação.
  const allAnimationClasses = [
    'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInDownBig', 'fadeInLeftBig', 'fadeInRightBig', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight',
    'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft',
    'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp',
    'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp',
    'bounce', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp',
    'rollIn', 'rollOut', 'flash', 'heartbeat', 'pulse',
    'shake', 'shakeX', 'shakeY', 'headShake',
    'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
    'lightSpeedInRight', 'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft',
    'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
    'rubberBand', 'swing', 'tada', 'wobble', 'jello', 'hinge', 'jackInTheBox',
    'backInDown', 'backInLeft', 'backInRight', 'backInUp', 'backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp'
  ];

  // Lista de classes utilitárias
  const allUtilityClasses = ['animated', 'infinite', 'faster', 'slower', 'delay-1s', 'delay-2s', 'delay-3s', 'delay-4s', 'repeat-2', 'repeat-3', 'repeat-4'];

  // Preencher o select de animações
  function populateAnimationSelect() {
    // Adicionar uma opção vazia no início
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione uma animação...';
    animationSelect.appendChild(defaultOption);

    allAnimationClasses.forEach(animationName => {
      const option = document.createElement('option');
      option.value = animationName;
      option.textContent = animationName;
      animationSelect.appendChild(option);
    });
  }

  function applyAnimation() {
    // Remover todas as classes de animação e utilitárias atuais
    // exceto a classe 'animated' base que deve estar sempre presente para o CSS padrão
    animationBox.classList.remove(...allAnimationClasses);
    animationBox.classList.remove('infinite', 'faster', 'slower', 'delay-1s', 'delay-2s', 'delay-3s', 'delay-4s', 'repeat-2', 'repeat-3', 'repeat-4');

    // Adicionar a classe 'animated' (caso tenha sido removida por algum motivo) [1]
    animationBox.classList.add('animated');

    const selectedAnimation = animationSelect.value;
    if (selectedAnimation) {
      animationBox.classList.add(selectedAnimation);
    }

    // Aplicar classes utilitárias baseadas nas seleções do usuário
    if (repeatSelect.value === 'infinite') {
      animationBox.classList.add('infinite'); // [1]
    } else if (repeatSelect.value) {
      animationBox.classList.add(repeatSelect.value); // Ex: 'repeat-2' [1]
    }

    if (fasterCheckbox.checked) {
      animationBox.classList.add('faster'); // [1]
    } else if (slowerCheckbox.checked) {
      animationBox.classList.add('slower'); // [1]
    }

    if (delaySelect.value) {
      animationBox.classList.add(delaySelect.value); // Ex: 'delay-1s' [1]
    }

    // Forçar um reflow para re-disparar a animação (importante se a mesma animação for selecionada novamente)
    void animationBox.offsetWidth;
  }

  function resetAnimation() {
    // Remover todas as classes de animação e utilitárias do elemento de teste
    animationBox.classList.remove(...allAnimationClasses, ...allUtilityClasses);
    animationBox.classList.add('animated'); // Adiciona a classe base de volta [1]

    // Resetar os controles para seus valores padrão
    animationSelect.value = '';
    fasterCheckbox.checked = false;
    slowerCheckbox.checked = false;
    delaySelect.value = '';
    repeatSelect.value = '';
  }

  // Inicializar o select de animações ao carregar a página
  populateAnimationSelect();
  resetAnimation(); // Garante um estado limpo ao carregar

  // Adicionar listeners de eventos
  animationSelect.addEventListener('change', applyAnimation);
  fasterCheckbox.addEventListener('change', applyAnimation);
  slowerCheckbox.addEventListener('change', applyAnimation);
  delaySelect.addEventListener('change', applyAnimation);
  repeatSelect.addEventListener('change', applyAnimation);
  applyButton.addEventListener('click', applyAnimation);
  resetButton.addEventListener('click', resetAnimation);
});