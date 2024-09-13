import DOMPurify from 'dompurify';

const handleLimitDescription = (html, maxLength) => {
    const cleanHTML = DOMPurify.sanitize(html); // Sanitize the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHTML, 'text/html');
    const text = doc.body.textContent || ''; // Extract plain text
  
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  
export default handleLimitDescription;