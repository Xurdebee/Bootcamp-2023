import React from 'react';
import AmigoSugerido from './AmigoSugerido';
import { Container } from 'react-bootstrap';

const BloqueSugeridos= ({user}) => {
	const userId = 1;
	return (
	<Container>
		<div className="bg-light p-2 rounded-3 border-1 border">
			<div className="text-center mb-3">
				<div className="">
					<article className="my-3">
						<AmigoSugerido userId={userId} />
					</article>
				</div>
			</div>
		</div>
	</Container>
	);
}

export default BloqueSugeridos;