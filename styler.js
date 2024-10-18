let mystyles = `
<style>
    :root {
        --themecolor: #3498db;
        --textcolor: #333;
        --table-border: #ddd;
        --table-bg: #f9f9f9;
        --table-hover: #f1f1f1;
        --table-heading-bg: #2980b9;
        --table-heading-color: #fff;
    }

    * {
        box-sizing: border-box;
        transition: 0.3s ease-out;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: var(--textcolor);
    }

    .lister{
        padding: 12px 20px;
    }
    ul li a{
        display: inline-block;
        padding: 12px 20px;
    }

    h2 {
        text-align: center;
        color: var(--themecolor);
        margin-top: 20px;
        padding: 12px 20px;
    }

    p {
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: var(--textcolor);
    }

    table {
        width: 80%;
        margin: 20px auto;
        border-collapse: collapse;
        background-color: var(--table-bg);
        border: 1px solid var(--table-border);
    }

    table th, table td {
        padding: 12px 15px;
        border: 1px solid var(--table-border);
        text-align: left;
    }

    table th {
        background-color: var(--table-heading-bg);
        color: var(--table-heading-color);
    }

    table tr:nth-child(even) {
        background-color: var(--table-hover);
    }

    table tr:hover {
        background-color: var(--table-hover);
    }

    /* extras */
    .topbtn {
		display: inline-block;
		background: dodgerblue;
		border-radius: 12px;
		color: #fff;
		position: fixed;
		top: 20px;
		left: 19px;
		padding: 12px 20px;
		text-decoration: none;
	}
</style>

`;

module.exports = mystyles;