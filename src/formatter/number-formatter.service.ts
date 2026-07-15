function roundOffNumber(value: number, decimalPlaces = 2) {
    if (!Number.isFinite(value)) throw new Error('Value is invalid');

    const finalValue = Math.round((value + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    return finalValue;
}

async function formatValueByRegion(languageCode: string, currencyCode: string, value: number, decimalPlaces?: number) {
    if (!Number.isFinite(value)) throw new Error('Value is invalid');

    if (!languageCode || !currencyCode) {
        const response = await fetch("https://ipapi.co");
        const regionDetails = await response.json();

        languageCode = `en-${regionDetails.country_code}`;
        currencyCode = regionDetails.currency;

        // Or any other api to get country details
    }

    return new Intl.NumberFormat(languageCode, {
        style: 'currency',
        currency: currencyCode.toUpperCase(), // don't want currency symbol in final value then remove currency and style
        notation: 'standard', //for compact like "1.5M" replace standard with compact
        compactDisplay: 'short',
        maximumFractionDigits: decimalPlaces ? decimalPlaces : 2
    }).format(value);
}

export { roundOffNumber, formatValueByRegion };