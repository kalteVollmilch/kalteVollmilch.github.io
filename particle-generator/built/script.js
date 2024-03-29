// Größe der Partikelrahmen bei 30mm Partikelgröße
const BORDER_SIZE_BASE = 1.5;
// Basisgröße der Partikel
const PARTICLE_SIZE_BASE = 30;
window.onload = () => {
    document.addEventListener("click", (event) => {
        handleWindowClick(event);
    });
};
const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, "");
/**
 * Clears the particle-canvas and generates a new one based on user-provided parameters
 */
function generateParticles() {
    let particleContainer = document.getElementById("particlesContainer");
    if (!particleContainer)
        return;
    particleContainer.replaceChildren();
    let particlesInput = document.getElementById("input_count_particles");
    let heightInput = document.getElementById("input_height");
    let widthInput = document.getElementById("input_width");
    let fillRatioInput = document.getElementById("fillRatioInput");
    let particlesCount = parseInt(particlesInput.value);
    let height = parseInt(heightInput.value);
    let width = parseInt(widthInput.value);
    const fillRatio = parseFloat(fillRatioInput.value);
    const sizes = getParticleSizeDistributions();
    const colors = getParticleColorDistributions();
    const maxSizeDistributionValue = sizes[sizes.length - 1].maxIndex;
    const maxColorDistributionValue = colors[colors.length - 1].maxIndex;
    setContainerSize(width, height, particleContainer);
    renderParticles(particleContainer, width, height, particlesCount, sizes, maxSizeDistributionValue, colors, maxColorDistributionValue, fillRatio);
}
function setContainerSize(width, height, container) {
    container.style.width = width + "mm";
    container.style.height = height + "mm";
}
function renderParticles(container, containerWidth, containerHeigt, particleCount, sizes, maxSizeDistributionValue, colors, maxColorDistributionValue, fillRatio) {
    for (let i = 0; i < particleCount; i++) {
        let particle = generateBaseParticle();
        let particleSizeDistributionIndex = getRandomInteger(0, maxSizeDistributionValue);
        let particleSize = getSizeFromDistribution(sizes, particleSizeDistributionIndex);
        let particleColorDistributionIndex = getRandomInteger(0, maxColorDistributionValue);
        let particleColor = getColorFromDistribution(colors, particleColorDistributionIndex);
        particle = setParticleSize(particle, particleSize, particleSize);
        particle = setParticleColor(particle, particleColor, fillRatio);
        particle = positionParticle(containerWidth, containerHeigt, particle);
        container.appendChild(particle);
    }
}
function getSizeFromDistribution(sizeDistrubution, index) {
    for (const particleSizeInput of sizeDistrubution) {
        if (particleSizeInput.maxIndex >= index) {
            const sizeInput = document.getElementById(particleSizeInput.sizeInputId);
            if (!sizeInput)
                return PARTICLE_SIZE_BASE;
            return parseInt(sizeInput.value);
        }
    }
}
function getColorFromDistribution(colorDistrubution, index) {
    for (const particleColorInput of colorDistrubution) {
        if (particleColorInput.maxIndex >= index) {
            const colorInput = document.getElementById(particleColorInput.colorInputId);
            if (!colorInput)
                return "#cccccc";
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
    else
        borderSize = Math.sqrt((width / PARTICLE_SIZE_BASE) * BORDER_SIZE_BASE);
    particle.style.borderWidth = borderSize + "mm";
    return particle;
}
function setParticleColor(particle, color, fillRatio) {
    particle.style.borderColor = color;
    if (getRandomInteger(1, 99) / 100 <= fillRatio)
        particle.style.background = color;
    return particle;
}
/**
 * Determines which particle-sizes the user selected and how frequent they should be
 * @returns user-selected sizes and a "Frequency-Index"
 */
function getParticleSizeDistributions() {
    const sizes = [];
    const particleSizesInput = document.getElementById("size-frequency-inputs");
    if (!particleSizesInput)
        return;
    let baseValue = 0;
    const frequencyInputs = particleSizesInput.querySelectorAll("input[type=range]");
    for (const frequencyInput of frequencyInputs) {
        baseValue = baseValue + parseInt(frequencyInput.value);
        const range = {
            maxIndex: baseValue,
            sizeInputId: frequencyInput.dataset.size_input,
        };
        sizes.push(range);
    }
    return sizes;
}
function getParticleColorDistributions() {
    const colors = [];
    const particleColorsInput = document.getElementById("color-frequency-inputs");
    if (!particleColorsInput)
        return;
    let baseValue = 0;
    const colorInputs = particleColorsInput.querySelectorAll("input[type=range]");
    for (const colorInput of colorInputs) {
        baseValue = baseValue + parseInt(colorInput.value);
        const range = {
            maxIndex: baseValue,
            colorInputId: colorInput.dataset.color_input,
        };
        colors.push(range);
    }
    return colors;
}
function addParticleSizeInput(size = null, frequency = null) {
    let sizeInputsCointainer = document.getElementById("size-frequency-inputs");
    if (!sizeInputsCointainer)
        return;
    let id = uid();
    let sizeInputId = generateSizeInputId(id);
    sizeInputsCointainer.appendChild(generateParticleSizeInput(sizeInputId, size.toString()));
    sizeInputsCointainer.appendChild(generateParticleFrequencyInput(sizeInputId, id, frequency.toString()));
    sizeInputsCointainer.appendChild(generateDeleteButton());
}
function generateSizeInputId(uid) {
    return "size-input-" + uid;
}
function generateParticleSizeInput(inputId, size) {
    let container = document.createElement("div");
    let input = document.createElement("input");
    input.id = inputId;
    input.setAttribute("type", "number");
    input.setAttribute("value", size !== null && size !== void 0 ? size : PARTICLE_SIZE_BASE.toString());
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.innerHTML = "Größe (mm):";
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function generateParticleFrequencyInput(sizeId, uid, frequency) {
    let container = document.createElement("div");
    let input = document.createElement("input");
    let inputId = "frequency-size-" + uid;
    input.id = inputId;
    input.setAttribute("type", "range");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", frequency !== null && frequency !== void 0 ? frequency : "100");
    input.dataset.size_input = sizeId;
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.innerHTML = "Häufigkeit:";
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function addParticleColorInput(color = null, frequency = null) {
    let colorInputsCointainer = document.getElementById("color-frequency-inputs");
    if (!colorInputsCointainer)
        return;
    let id = uid();
    let colorInputId = generateColorInputId(id);
    colorInputsCointainer.appendChild(generateParticleColorInput(colorInputId, color));
    colorInputsCointainer.appendChild(generateParticleColorFrequencyInput(colorInputId, id, frequency.toString()));
    colorInputsCointainer.appendChild(generateDeleteButton());
}
function generateColorInputId(uid) {
    return "color-input-" + uid;
}
function generateParticleColorInput(inputId, color) {
    let container = document.createElement("div");
    let input = document.createElement("input");
    input.id = inputId;
    input.setAttribute("type", "color");
    input.setAttribute("value", color !== null && color !== void 0 ? color : "#abcdef");
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.innerHTML = "Farbe:";
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function generateParticleColorFrequencyInput(sizeId, uid, frequency) {
    let container = document.createElement("div");
    let input = document.createElement("input");
    let inputId = "frequency-color-" + uid;
    input.id = inputId;
    input.setAttribute("type", "range");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", frequency !== null && frequency !== void 0 ? frequency : "100");
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
    const eventTarget = event.target;
    if (!event.target ||
        eventTarget.type !== "button" ||
        !eventTarget.classList.contains("deleteInput"))
        return;
    if (eventTarget.parentElement.childElementCount <= 3)
        return;
    eventTarget.previousElementSibling.previousElementSibling.remove();
    eventTarget.previousElementSibling.remove();
    eventTarget.remove();
}
function createConfigurationContent() {
    const sizes = [];
    const particleSizesInput = document.getElementById("size-frequency-inputs");
    if (!particleSizesInput)
        return;
    const frequencyInputs = particleSizesInput.querySelectorAll("input[type=range]");
    for (const frequencyInput of frequencyInputs) {
        let sizeValueInput = document.getElementById(frequencyInput.dataset.size_input);
        const range = {
            maxIndex: parseInt(frequencyInput.value),
            size: parseInt(sizeValueInput.value),
        };
        sizes.push(range);
    }
    const colors = [];
    const particleColorsInput = document.getElementById("color-frequency-inputs");
    if (!particleColorsInput)
        return;
    const colorInputs = particleColorsInput.querySelectorAll("input[type=range]");
    for (const colorInput of colorInputs) {
        let colorValueInput = document.getElementById(colorInput.dataset.color_input);
        const range = {
            maxIndex: parseInt(colorInput.value),
            color: colorValueInput.value,
        };
        colors.push(range);
    }
    let config = {
        sizes: sizes,
        colors: colors,
        canvasWidth: document.getElementById("input_width").value,
        canvasHeight: document.getElementById("input_height").value,
        particleCount: document.getElementById("input_count_particles").value,
        fillRatio: document.getElementById("fillRatioInput").value,
        borderMode: document.getElementById("borderMode").value,
    };
    return JSON.stringify(config);
}
function download(content, mimeType, filename) {
    const a = document.createElement("a"); // Create "a" element
    const blob = new Blob([content], { type: mimeType }); // Create a blob (file-like object)
    const url = URL.createObjectURL(blob); // Create an object URL from blob
    a.setAttribute("href", url); // Set "a" element link
    a.setAttribute("download", filename); // Set download filename
    a.click(); // Start downloading
}
function downloadConfiguration() {
    const mimeType = "application/json";
    let content = createConfigurationContent();
    download(content, mimeType, "config_ParticleGenerator");
}
function loadSavedConfiguration() {
    const fileInput = document.getElementById("configurationUploadInput");
    if (!fileInput || fileInput.files.length < 1)
        return;
    const fileToLoad = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        // e.target.result may be an ArrayBuffer, which needs to be converted to string first
        applySavedConfiguration(JSON.parse(e.target.result.toString()));
    };
    reader.readAsBinaryString(fileToLoad);
}
function applySavedConfiguration(configuration) {
    if (!configuration || !("sizes" in configuration) || !("colors" in configuration))
        return;
    let sizeInputsCointainer = document.getElementById("size-frequency-inputs");
    if (!sizeInputsCointainer)
        return;
    let colorInputsCointainer = document.getElementById("color-frequency-inputs");
    if (!colorInputsCointainer)
        return;
    sizeInputsCointainer.replaceChildren();
    colorInputsCointainer.replaceChildren();
    for (const particleSize of configuration.sizes) {
        addParticleSizeInput(particleSize.size, particleSize.maxIndex);
    }
    for (const particleColor of configuration.colors) {
        addParticleColorInput(particleColor.color, particleColor.maxIndex);
    }
    document.getElementById("input_width").value = configuration.canvasWidth;
    document.getElementById("input_height").value = configuration.canvasHeight;
    document.getElementById("input_count_particles").value =
        configuration.particleCount;
    document.getElementById("fillRatioInput").value = configuration.fillRatio;
    document.getElementById("borderMode").value = configuration.borderMode;
}
