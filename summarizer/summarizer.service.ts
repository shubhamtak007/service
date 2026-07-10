async function summarizeText(text: string) {
    if (!text) throw new Error('text is required!!!');

    try {
        if ('Summarizer' in self) {
            const summarizer = await (self as any).Summarizer.create({
                type: 'tldr',
                outputLanguage: 'en-GB',
                length: 'medium',
                format: 'plain-text'
            })

            const summary = await summarizer.summarize(text);
            return summary;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(JSON.stringify(error))
        }
    }
}

export { summarizeText };