import mammoth from 'mammoth'

const result = await mammoth.extractRawText({ path: 'data/Marudeni_Foods_Website_Requirements_and_Design_Specification-93dbc2.docx' })
console.log(result.value)
