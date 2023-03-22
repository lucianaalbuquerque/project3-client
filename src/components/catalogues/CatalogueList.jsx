import { Link } from "react-router-dom";

function CatalogueList({ catalogueList }) {
	return !catalogueList.lenght ? (
		<p>Create your first catalogue </p>
	) : (
		<div>
			{catalogueList.map((catalogue) => {
				return (
					<div key={catalogue._id}>
						<Link to={`/catalogue/${catalogue._id}`}>
							<h3>{catalogue.name}</h3>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default CatalogueList;
