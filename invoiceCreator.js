var PdfTable = require('voilab-pdf-table'),
	PdfDocument = require('pdfkit');
var lorem = 'lorem ipsum dolo sit amet';

module.exports = {
	create: function(content) {
		// create a PDF from PDFKit, and a table from PDFTable
		var pdf = new PdfDocument(),
			table = new PdfTable(pdf, {
				bottomMargin: 30
			});
		pdf.image('images/loncheando.png', 50, 10, 20, 10);
		pdf.text(content.id, 50, 80);
		pdf
			.scale(1)
			.text('telefono: (504) 9999-9999', 50, 100)
			.font('Helvetica', 13)
			.moveDown();

		pdf
			.text('Direccion: XXXXXXXXXXXXX, XXXXXXXXXXXXXX, XXXXX', 50, 110)
			.font('Helvetica', 13)
			.moveDown();

		table
			// add some plugins (here, a 'fit-to-width' for a column)
			.addPlugin(
				new (require('voilab-pdf-table/plugins/fitcolumn'))({
					column: 'description'
				})
			)
			// set defaults to your columns
			.setColumnsDefaults({
				headerBorder: 'B',
				align: 'right'
			})
			// add table columns
			.addColumns([
				{
					id: 'description',
					header: 'Producto',
					align: 'left',
					width: 50
				},
				{
					id: 'business',
					header: 'Restaurante',
					width: 100
				},
				{
					id: 'quantity',
					header: 'Cantidad',
					width: 60
				},
				{
					id: 'price',
					header: 'Precio',
					width: 50
				},
				{
					id: 'total',
					header: 'Total',
					width: 70,
					renderer: function(tb, data) {
						return 'HNL ' + data.total;
					}
				}
			])
			// add events (here, we draw headers on each new page)
			.onPageAdded(function(tb) {
				tb.addHeader();
			});
		// draw content, by passing data to the addBody method
		table.addBody(content.content);

		return pdf;
	}
};
