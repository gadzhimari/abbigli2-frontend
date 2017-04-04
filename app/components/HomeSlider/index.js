import React from 'react';
import {
    TileWrap,
    Card,
} from 'components'
import './index.styl'

class HomeSlider extends React.Component {

    constructor(){
        super()
        this.state = {
            page: 1,
            width: 1220,
            rows: 2,
            factor: 246,
        }
        this.goLeft = this.goLeft.bind(this);
        this.goRight = this.goRight.bind(this);
        this.adjustScreen = this.adjustScreen.bind(this);
    }

    componentDidMount(){
        this.adjustScreen();
        window.addEventListener('resize',this.adjustScreen);
    }

    adjustScreen(){
        const screenWidth = window.innerWidth;
        let width;
        let factor;
        let rows;
        const breakpoints = [305,480, 730, 900, 970, 1220];

        for( let i=0;i<=breakpoints.length;i++ ){
            if(screenWidth > breakpoints[i]){
                width = breakpoints[i];
            }
        }

        if(width < 500){
            rows = 3;
            factor = 150;
        }else{
            rows = 2;
            factor = 246;
        }

        this.setState({width: width, rows: rows, factor: factor})
    }

    goLeft(){
        if(this.state.page > 1)
            this.setState({page: this.state.page - 1});
    }

    goRight(){
        if(this.state.page < 2)
            this.setState({page: this.state.page + 1});
    }

    goPage(page){
            this.setState({page});
    }

    render() {
        const itemsSections = this.props.itemsSections;

        return (
            <div className="slider-wrapper" style={{width: this.state.width + 'px'}}>
                <div className="slider-nav">
                    <div className={"slick-arrow slick-prev" + (this.state.page == 1 ? ' slick-disabled' : '')} onClick={this.goLeft}>LEFT</div>
                    <div className={"slick-arrow slick-next" + (this.state.page == 2 ? ' slick-disabled' : '')} onClick={this.goRight}>RIGHT</div>
                </div>
                <div className="slider" style={{height: (this.state.factor*this.state.rows)+'px', width: this.state.width + 'px'}}>
                    <div className="slider-inner" style={{
                        width: (this.state.factor * itemsSections.length / this.state.rows) + 'px',
                        transform: 'translate(-'+ ((this.state.page - 1) * this.state.width) +'px,0)'
                    }}>
                        {itemsSections.length > 0 && itemsSections.map((item) => (
                            <Card
                                data={item}
                                key={`${item.slug}--homeslider`}
                            />
                        ))
                        }
                    </div>
                </div>
                <div className="slider-pagination">
                   <div className={"slider-pagination__item" + (this.state.page == 1 ? ' active' : '')} onClick={()=>{this.goPage(1)}}></div>
                   <div className={"slider-pagination__item" + (this.state.page == 2 ? ' active' : '')} onClick={()=>{this.goPage(2)}}></div>
                   <div className={"slider-pagination__item" + (this.state.page == 3 ? ' active' : '')} onClick={()=>{this.goPage(3)}}></div>
                </div>
            </div>
        )
    }
}

export default HomeSlider;