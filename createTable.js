let PdfTable = require('voilab-pdf-table');
let PdfDocument = require('pdfkit');

var capitalizeEachWord = (phrase = '')=>{
  console.log('cap', phrase)
  return phrase.split(' ')
    .map(word => {
      let splitWord = word.split('');
      splitWord[0] = splitWord[0].toUpperCase();
      return splitWord.join('');
    })
    .join(' ')
}

module.exports = {
    create: function ({_doc}) {
      delete _doc._id
      delete _doc.__v

      var headers = Object.keys(_doc).map(header => {
          return {
            header: header.split('_').join(' '),
            id: header,
            width: 70,
            valign: 'center',
          }
      });
        // create a PDF from PDFKit, and a table from PDFTable
        var pdf = new PdfDocument({
                autoFirstPage: false,
                layout: 'landscape',
                size: [841.89, 1190.55],
                margins: {
                  top: 100,
                  bottom: 20,
                  left: 3,
                  right:10
                }
            });

            table = new PdfTable(pdf, {
                bottomMargin: 30
            });

        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: ['B', 'T', 'L', 'R'],
                align: 'center',
                padding: [30, 5, 5, 5]
            })
            // add table columns
            .addColumns(headers)
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();

        // draw content, by passing data to the addBody method
        table.addBody([_doc]);

        return pdf;
    }
};