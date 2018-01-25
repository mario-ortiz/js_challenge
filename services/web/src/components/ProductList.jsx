import React from 'react';

const ProductList = (props) => {
    return (
        <div className="text-center">
            <table className="table stripped">
                <thead>
                    <tr>
                        <th>ASIN</th>
                        <th>Category</th>
                        <th>Rank</th>
                        <th>Height</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map(product => (
                        <tr className="text-left" key={product.product_id}>
                            <td>{product.asin}</td>
                            <td>{product.category}</td>
                            <td>{product.rank}</td>
                            <td>{product.height}</td>
                            <td>{product.length}</td>
                            <td>{product.width}</td>
                            <td>{product.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default ProductList;