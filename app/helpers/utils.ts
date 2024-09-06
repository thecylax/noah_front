export const validateUrl = (value: string | null) => {
    if (value) {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)' + // protocolo
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou endereço de IP (v4)
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // porta e caminho
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z\\d_]*)?$',
            'i'
        );
        return !!urlPattern.test(value); // Retorna true ou false
    }
    return false;
};
