import Button from '../Elements/Button';

const CardProduct = (props) => {
    const { children } = props;
    return (
        <div className="w-full h-full max-w-3xs bg-gray-800 border border-gray-700 rounded-lg shadow mx-2 my-2 flex flex-col justify-between">
            {children}
        </div>
    )
}

const Header = (props) => {
    const { image } = props;
    return (
        <div className="h-64 overflow-hidden rounded-t-lg">
            <img 
            src={image}
            alt="products" 
            className="w-full h-full object-cover p-4"
            />
        </div>
    )
}

const Body = (props) => {
    const { title, children } = props;
    return (
        <div className="px-5 pb-5 flex-grow">
            <h5 className="text-lg font-semibold tracking-tight text-white">
                {title}
            </h5>
            <p className="text-sm text-white line-clamp-2">
                {children}
            </p>
        </div> 
    )
}

const Footer = (props) => {
    const { price, handleAddToCart } = props;
    return (
        <div className="flex flex-col items-start gap-2 px-5 pb-5">
            <span className="text-2xl font-bold text-white">{price.toLocaleString('id-ID', { style: 'currency', currency: 'USD' })}</span>
            <Button 
                classname="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleAddToCart}
                type="button"
            >
                Add to Cart
            </Button>
        </div> 
    )
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;