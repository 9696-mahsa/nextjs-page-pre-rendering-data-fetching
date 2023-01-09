import { Fragment } from "react";
import fs from 'fs/promises';
import path from 'path';

export default function ProductDetailPage (props) {

    const { loadedProduct } = props;

    if( !loadedProduct ) {   //for thi if() , fallback in getStaticPaths, must be true
        return (
            <p>Loading ....</p>
        )
    }

    return(
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );

}

async function getData () {
    const filePath = path.join(process.cwd(), 'data' , 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();
    const product = data.products.find(product => product.id === productId);

    if( !product ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            loadedProduct : product
        }
    };
}

export async function getStaticPaths () {
    const data = await getData();
    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map((id) => ({params: { pid: id }}))
    return {
        paths: pathsWithParams,
        fallback: true 
        // false : pre-generating all the paths: {} ,
        // true : just pre-generating only the path in paths:{} , and othe path will be gererated when they are needed
        // 'blocking' : we dont need the fallback check in ProductDetailPage() -> if( !loadedProduct )
    }
}