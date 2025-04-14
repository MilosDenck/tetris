

const NextShapeComponent = ({shape}:{shape:number}) => {

    const renderShape = (): number[] => {
        switch (shape) {
            case 0:
                return [0,1,2,3]
            case 1:
                return [0,1,5,6]
            case 2:
                return [1,2,4,5]
            case 3:
                return [1,4,5,6]
            case 4:
                return [1,2,5,6]
            case 5:
                return [0,4,5,6]
            case 6:
                return [2,4,5,6]
            default:
                return [0,0,0,0]
        }
    }

    const shapeArr = renderShape()

	return (
        <div className="next-shape-container">
            
            <div>
                <div style={{fontSize: 10}}>
                    next:
                </div>
                <div className="next-shape">
                <div className="shape-row">
                    {[...Array(4)].map((_, i) => (
                        <div className="shape-element" style={{backgroundColor: shapeArr.some(val => val === i)? "black" : "white"}}></div>
                    ))}
                </div>
                <div className="shape-row">
                    {[...Array(4)].map((_, i) => (
                        <div className="shape-element" style={{backgroundColor: shapeArr.some(val => val === i+4)? "black" : "white"}}></div>
                    ))}
                </div>
            </div> 
            </div>
            
        </div>
		
	)
}

export default NextShapeComponent;