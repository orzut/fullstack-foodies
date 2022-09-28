import React, {useState} from 'react';
import ReactSlider from "react-slider";
import './FilterSlider.css';

const FilterSlider = ({sliderVal, setSliderVal, min, max, defaultValue, sliderType}) => {
    return (
        <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            markClassName="customSlider-mark"
            marks={20}
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={sliderVal}
            onChange={(value) => setSliderVal(oldValue => ({...oldValue, [`${sliderType}`]: value}))}
            renderMark={(props) => {
                if (props.key < sliderVal) {
                    props.className = "customSlider-mark customSlider-mark-before";
                } else if (props.key === sliderVal) {
                    props.className = "customSlider-mark customSlider-mark-active";
                }
                return <span {...props} />;
            }}
        />
    );
};

export default FilterSlider;