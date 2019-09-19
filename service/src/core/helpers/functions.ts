export function textInterception(text: string, length: number = 120) {
    return text.length >= length ? text.replace(new RegExp('<.+?>', 'g'), '').substr(0, length) + '...' : text;
}

export function extractionTextInHtml(html: string) {
    return !!html ? html.replace(new RegExp('<.+?>', 'g'), '') : '';
}