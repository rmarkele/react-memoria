export const formatElapsedTime = (eT: number) => {
    let minutes = Math.floor(eT / 60)
        .toString()
        .padStart(2, '0');
    let seconds = (eT % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}