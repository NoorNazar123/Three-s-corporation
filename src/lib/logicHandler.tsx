'use client';

export const formatDescription = (desc: string) => {
  if (!desc) return <div />;

  const bold = /\*\*(.*?)\*\*/g;                     
  const highlight = /\$\$(.*?)\$\$/g;                
  const heading = /##(.*?)##/g;                      
  const link = /\[(.*?)\]\((.*?)\)/g;                
  const bulletList = /^--\s+(.*)$/gm;               

  let processed = desc
 
    .replace(
      heading,
      "<h3 class='text-lg font-semibold mt-4 mb-2 text-gray-900'>$1</h3>"
    )

    .replace(bold, "<b>$1</b>")

    .replace(
      highlight,
      "<mark class='bg-red-100 text-red-700 px-1 rounded'>$1</mark>"
    )

    .replace(
      link,
      "<a href='$2' target='_blank' class='text-blue-600 underline'>$1</a>"
    );

  processed = processed.replace(
    /((?:^--\s+.*(?:\n|$))+)/gm,
    (match) => {
      const items = match
        .trim()
        .split(/\n/)
        .map((line) => line.replace(/^--\s+/, "").trim())
        .filter(Boolean)
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ul class='list-disc list-inside pl-5 my-2'>${items}</ul>`;
    }
  );

  // Line breaks
  processed = processed.replace(/\n/g, "<br />");

  return <div dangerouslySetInnerHTML={{ __html: processed }} />;
};
