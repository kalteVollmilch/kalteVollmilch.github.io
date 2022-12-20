// Größe der Partikelrahmen bei 30mm Partikelgröße
const BORDER_SIZE_BASE = 1.5;

// Basisgröße der Partikel
const PARTICLE_SIZE_BASE = 30;

window.onload = (e) => {
  document.addEventListener("click", (event) => {
    handleWindowClick(event);
  });
};

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );

function generateParticles() {
  let particleContainer = document.getElementById("particlesContainer");
  if (!particleContainer) return;

  particleContainer.replaceChildren();
  let particlesInput = document.getElementById("input_count_particles");
  let heightInput = document.getElementById("input_height");
  let widthInput = document.getElementById("input_width");

  let particlesCount = particlesInput.value;
  let height = heightInput.value;
  let width = widthInput.value;

  const sizes = getParticleSizeDistributions();
  const colors = getParticleColorDistributions();
  const maxSizeDistributionValue = sizes[sizes.length - 1].maxValue;
  const maxColorDistributionValue = colors[colors.length - 1].maxValue;

  setContainerSize(width, height, particleContainer);
  renderParticles(
    particleContainer,
    width,
    height,
    particlesCount,
    sizes,
    maxSizeDistributionValue,
    colors,
    maxColorDistributionValue
  );
}

function setContainerSize(width, height, container) {
  container.style.width = width + "mm";
  container.style.height = height + "mm";
}

function renderParticles(
  container,
  containerWidth,
  containerHeigt,
  particleCount,
  sizes,
  maxSizeDistributionValue,
  colors,
  maxColorDistributionValue
) {
  for (let i = 0; i < particleCount; i++) {
    let particle = generateBaseParticle();

    let particleSizeDistributionIndex = getRandomInteger(
      0,
      maxSizeDistributionValue
    );
    let particleSize = getSizeFromDistribution(
      sizes,
      particleSizeDistributionIndex
    );

    let particleColorDistributionIndex = getRandomInteger(
      0,
      maxColorDistributionValue
    );
    let particleColor = getColorFromDistribution(
      colors,
      particleColorDistributionIndex
    );

    particle = setParticleSize(particle, particleSize, particleSize);
    particle = setParticleColor(particle, particleColor);
    particle = positionParticle(containerWidth, containerHeigt, particle);
    container.appendChild(particle);
  }
}

function getSizeFromDistribution(sizeDistrubution, index) {
  for (const particleSizeInput of sizeDistrubution) {
    if (particleSizeInput.maxValue > index) {
      const sizeInput = document.getElementById(particleSizeInput.sizeInput);
      if (!sizeInput) return PARTICLE_SIZE_BASE;

      return parseInt(sizeInput.value);
    }
  }
}

function getColorFromDistribution(colorDistrubution, index) {
  for (const particleColorInput of colorDistrubution) {
    if (particleColorInput.maxValue > index) {
      const colorInput = document.getElementById(particleColorInput.colorInput);
      if (!colorInput) return "#284695";

      return colorInput.value;
    }
  }
}

function generateBaseParticle() {
  let particle = document.createElement("div");
  particle.classList.add("particle");
  return particle;
}

function positionParticle(containerWidth, containerHeight, particle) {
  let particleWidth = parseInt(particle.style.width);
  let particleHeight = parseInt(particle.style.height);

  let maxWidth = containerWidth - particleWidth;
  let maxHeight = containerHeight - particleHeight;

  particle.style.left = getRandomInteger(0, maxWidth) + "mm";
  particle.style.top = getRandomInteger(0, maxHeight) + "mm";

  return particle;
}

function setParticleSize(particle, width, height) {
  particle.style.width = width + "mm";
  particle.style.height = height + "mm";

  let borderSize;
  const borderMode = document.getElementById("borderMode");
  if (!borderMode || borderMode.value !== "sqrt")
    borderSize = (width / PARTICLE_SIZE_BASE) * BORDER_SIZE_BASE;
  else borderSize = Math.sqrt((width / PARTICLE_SIZE_BASE) * BORDER_SIZE_BASE);
  particle.style.borderWidth = borderSize + "mm";
  return particle;
}

function setParticleColor(particle, color) {
  particle.style.borderColor = color;
  return particle;
}

function getParticleSizeDistributions() {
  const sizes = [];
  const particleSizesInput = document.getElementById("size-frequency-inputs");
  if (!particleSizesInput) return;

  let baseValue = 0;
  const frequencyInputs =
    particleSizesInput.querySelectorAll("input[type=range]");
  for (const frequencyInput of frequencyInputs) {
    baseValue = baseValue + parseInt(frequencyInput.value);
    const range = {
      maxValue: baseValue,
      sizeInput: frequencyInput.dataset.size_input,
    };

    sizes.push(range);
  }

  return sizes;
}

function getParticleColorDistributions() {
  const colors = [];
  const particleColorsInput = document.getElementById("color-frequency-inputs");
  if (!particleColorsInput) return;

  let baseValue = 0;
  const colorInputs = particleColorsInput.querySelectorAll("input[type=range]");
  for (const colorInput of colorInputs) {
    baseValue = baseValue + parseInt(colorInput.value);
    const range = {
      maxValue: baseValue,
      colorInput: colorInput.dataset.color_input,
    };

    colors.push(range);
  }

  return colors;
}

function addParticleSizeInput() {
  let sizeInputsCointainer = document.getElementById("size-frequency-inputs");
  if (!sizeInputsCointainer) return;

  let id = uid();
  let sizeInputId = generateSizeInputId(id);
  sizeInputsCointainer.appendChild(generateParticleSizeInput(sizeInputId));
  sizeInputsCointainer.appendChild(
    generateParticleFrequencyInput(sizeInputId, id)
  );
  sizeInputsCointainer.appendChild(generateDeleteButton());
}

function generateSizeInputId(uid) {
  return "size-input-" + uid;
}

function generateParticleSizeInput(inputId) {
  let container = document.createElement("div");
  let input = document.createElement("input");
  input.id = inputId;
  input.setAttribute("type", "number");
  input.setAttribute("value", PARTICLE_SIZE_BASE);

  let label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.innerHTML = "Größe (mm):";

  container.appendChild(label);
  container.appendChild(input);
  return container;
}

function generateParticleFrequencyInput(sizeId, uid) {
  let container = document.createElement("div");
  let input = document.createElement("input");
  let inputId = "frequency-size-" + uid;
  input.id = inputId;
  input.setAttribute("type", "range");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", "100");
  input.dataset.size_input = sizeId;

  let label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.innerHTML = "Häufigkeit:";

  container.appendChild(label);
  container.appendChild(input);
  return container;
}

function addParticleColorInput() {
  let colorInputsCointainer = document.getElementById("color-frequency-inputs");
  if (!colorInputsCointainer) return;

  let id = uid();
  let colorInputId = generateColorInputId(id);
  colorInputsCointainer.appendChild(generateParticleColorInput(colorInputId));
  colorInputsCointainer.appendChild(
    generateParticleColorFrequencyInput(colorInputId, id)
  );
  colorInputsCointainer.appendChild(generateDeleteButton());
}

function generateColorInputId(uid) {
  return "color-input-" + uid;
}

function generateParticleColorInput(inputId) {
  let container = document.createElement("div");
  let input = document.createElement("input");
  input.id = inputId;
  input.setAttribute("type", "color");
  input.setAttribute("value", "#284695");

  let label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.innerHTML = "Farbe:";

  container.appendChild(label);
  container.appendChild(input);
  return container;
}

function generateParticleColorFrequencyInput(sizeId, uid) {
  let container = document.createElement("div");
  let input = document.createElement("input");
  let inputId = "frequency-color-" + uid;
  input.id = inputId;
  input.setAttribute("type", "range");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", "100");
  input.dataset.color_input = sizeId;

  let label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.innerHTML = "Häufigkeit:";

  container.appendChild(label);
  container.appendChild(input);
  return container;
}

function generateDeleteButton() {
  const button = document.createElement("button");
  button.classList.add("deleteInput");
  button.innerHTML = "Löschen";
  button.setAttribute("type", "button");
  return button;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleWindowClick(event) {
  if (
    !event.target ||
    event.target.type !== "button" ||
    !event.target.classList.contains("deleteInput")
  )
    return;

  if (event.target.parentElement.childElementCount <= 3) return;

  event.target.previousElementSibling.previousElementSibling.remove();
  event.target.previousElementSibling.remove();
  event.target.remove();
}
