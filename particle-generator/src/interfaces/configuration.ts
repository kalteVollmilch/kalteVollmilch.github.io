type borderMode = "linear" | "sqrt";

interface Configuration{
    colors: ConfigurationParticleColors[],
    sizes: ConfigurationParticleSizes[],
    particleCount: string,
    canvasWidth: string,
    canvasHeight: string,
    fillRatio: string,
    borderMode: borderMode,
}

interface ConfigurationParticleSizes{
    size: number,
    maxIndex: number,
}

interface ConfigurationParticleColors{
    color: string,
    maxIndex: number,
}