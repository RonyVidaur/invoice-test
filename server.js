let express = require('express');
let invoiceCreator = require('./invoiceCreator');
let app = express();

app.get('/:id', (req, res) => {
	data = find(req.params.id);
	let invoice = invoiceCreator.create(data);
	invoice.pipe(res);
	invoice.end();
});

let invoices = [
	{
		id: 1,
		content: [
			{
				description: 'Burga',
				business: 'matambritas',
				quantity: 1,
				price: 20.05,
				total: 20.05
			},
			{
				description: 'Apple Pie',
				business: 'pizza hut',
				quantity: 4,
				price: 4.5,
				total: 17.55
			},
			{
				description: 'Breakfast pizza',
				business: 'picarollos',
				quantity: 2,
				price: 17.85,
				total: 55.75
			}
		]
	}
];

find = function(id) {
	return invoices[0];
};

app.listen(3000, () => {
	console.log('im alive');
});
