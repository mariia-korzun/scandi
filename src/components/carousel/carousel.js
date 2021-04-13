import React, { useState, useEffect } from 'react'

import Slide from '../slide'
import ChangeSlideButton from '../change-slide-button'
import SliderDot from '../slider-dot'
import './carousel.css'

const Carousel = ({ data, contentComponent: Content }) => {
    const TRANSITION_TIME = 0.3
    const SHORT_TRANSITION_TIME = 0.1
    const MAX_SWIPE_TIME = 500
    const MAX_SHIFT = 100
    const MIN_SHIFT = 15
    const PREV_SLIDE = -1
    const CURRENT_SLIDE = 0
    const NEXT_SLIDE = 1

    const getNewStyles = (shift, time, direction, changeOpacity = false) => {
        const transition = time ? `left ${time}s linear` : 'none'
        return {
            prev: {
                left: `calc(-100% - ${shift}px)`,
                transition: transition,
                zIndex: direction ? 99 : '',
                opacity: direction ? 1 : changeOpacity ? 1 : 0
            },
            current: {
                left: `${-1 * shift}px`,
                transition: transition,
                zIndex: 99
            },
            next: {
                left: `calc(100% + ${-shift}px)`,
                transition: transition,
                zIndex: direction ? '' : 99,
                opacity: direction ? changeOpacity ? 1 : 0 : 1
            }
        }
    }

    const getNewIndexes = (newCurrentSlideIndex) => {
        return {
            prev: defineNextIndex(false, newCurrentSlideIndex, data),
            current: newCurrentSlideIndex,
            next: defineNextIndex(true, newCurrentSlideIndex, data)
        }
    }


    function getNewValuesArray(oldArray, values, dynamicKey) {
        return oldArray.map(item => {
            switch (item.position) {
                case PREV_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.prev
                    }
                }
                case CURRENT_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.current
                    }
                }
                case NEXT_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.next
                    }
                }
            }
        })
    }

    function getNewClassesArray(classes, styles) {
        return getNewValuesArray(classes, styles, 'style')
    }

    function getNewIndexesArray(indexes, newIndexes) {
        return getNewValuesArray(indexes, newIndexes, 'index')
    }

    const [shift, setShift] = useState(0)
    const [firstTouch, setFirstTouch] = useState(null)


    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [sliderDotIndex, setSliderDotIndex] = useState(0)
    const [sliderDotEqualCurrentSlide, setSliderDotEqualCurrentSlide] = useState(false)
    const [changeSlide, setChangeSlide] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    let initialStyles = getNewStyles(0, TRANSITION_TIME, true)
    const [classes, setClasses] = useState([
        {
            position: PREV_SLIDE,
            style: initialStyles.prev
        },
        {
            position: CURRENT_SLIDE,
            style: initialStyles.current
        },
        {
            position: NEXT_SLIDE,
            style: initialStyles.next
        }
    ])

    let initialIndexes = getNewIndexes(currentSlideIndex)
    const [indexes, setIndexes] = useState([
        {
            position: PREV_SLIDE,
            index: initialIndexes.prev
        },
        {
            position: CURRENT_SLIDE,
            index: initialIndexes.current
        },
        {
            position: NEXT_SLIDE,
            index: initialIndexes.next

        }
    ])

    const [direction, setDirection] = useState(null)


    function changeOrder(direction, array) {
        if (direction === null) { return array }
        return direction ? [array[array.length - 1], ...array.slice(0, array.length - 1)] : [...array.slice(1), array[0]]
    }

    function defineNextIndex(direction, currentIndex, array) {
        return direction ? (currentIndex + 1) % array.length : ((currentIndex - 1) + array.length) % array.length
    }

    useEffect(() => {
        if (currentSlideIndex === sliderDotIndex) { return }

        let direction = (sliderDotIndex - currentSlideIndex) > 0

        initiateSlideChange({
            direction,
            transition: SHORT_TRANSITION_TIME,
            changeSlide: false,
            updateDots: false
        })

        setTimeout(() => {
            setChangeSlide(true)
        }, SHORT_TRANSITION_TIME * 1000)
    }, [currentSlideIndex, sliderDotIndex])


    useEffect(() => {
        if (direction === null || changeSlide !== true) { return }

        let newCurrentSlideIndex = defineNextIndex(direction, currentSlideIndex, data)
        let newIndexes = getNewIndexes(newCurrentSlideIndex)
        let newIndexesArray = getNewIndexesArray(indexes, newIndexes)

        setCurrentSlideIndex(newCurrentSlideIndex)
        if (sliderDotEqualCurrentSlide) {
            setSliderDotIndex(newCurrentSlideIndex)
            setSliderDotEqualCurrentSlide(false)
        }
        setIndexes(changeOrder(direction, newIndexesArray))
        setDirection(null)
        setChangeSlide(false)

    }, [changeSlide])

    function handleTouchStart(e) {
        setFirstTouch({
            x: e.touches[0].clientX,
            time: Date.now()
        })
    }
    function handleTouchMove(e) {

        let newShift = firstTouch.x - e.touches[0].clientX
        let newDirection = newShift >= 0

        initiateSlideChange({
            direction: newDirection,
            shift: newShift,
            transition: null,
            changeOpacity: true,
            isChangeOrder: false,
            updateDots: false,
            changeSlide: false
        })
        setShift(newShift)
    }
    function handleTouchEnd() {
        if (direction === null) { return }
        let swipeTime = Date.now() - firstTouch.time

        if ((Math.abs(shift) > MAX_SHIFT || (swipeTime < MAX_SWIPE_TIME && Math.abs(shift) > MIN_SHIFT))) {

            initiateSlideChange({ direction })
        }
        else {
            initiateSlideChange({
                changeDirection: false,
                direction,
                changeOpacity: true,
                isChangeOrder: false,
                updateDots: false,
                changeSlide: false
            })
        }

    }


    function initiateSlideChange({ changeDirection = true, direction = true,
        shift = 0, updateDots = true, isChangeOrder = true, changeSlide = true,
        transition = TRANSITION_TIME, changeOpacity = false } = {}) {

        if (changeDirection) {
            setDirection(direction)
        }
        let newStyles = getNewStyles(shift, transition, direction, changeOpacity)
        let newClasses = getNewClassesArray(classes, newStyles)
        setClasses(isChangeOrder ? changeOrder(direction, newClasses) : newClasses)

        if (updateDots) { setSliderDotEqualCurrentSlide(updateDots) }

        setChangeSlide(changeSlide)
    }

    return (
        <div className="carousel-container">
            <ChangeSlideButton
                isRight={false}
                disabled={isButtonDisabled}
                onClick={() => {
                    initiateSlideChange({ direction: false })

                    setIsButtonDisabled(true)
                    setTimeout(() => {
                        setIsButtonDisabled(false)
                    }, TRANSITION_TIME * 1000)

                }} />

            <div className="carousel"
                onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => handleTouchEnd()}>

                <Slide style={classes[0].style} >
                    <Content data={data[indexes[0].index]} />
                </Slide>
                <Slide style={classes[1].style} >
                    <Content data={data[indexes[1].index]} />
                </Slide>
                <Slide style={classes[2].style} >
                    <Content data={data[indexes[2].index]} />
                </Slide>
            </div>
            <ChangeSlideButton
                isRight={true}
                disabled={isButtonDisabled}
                onClick={() => {
                    initiateSlideChange()

                    setIsButtonDisabled(true)
                    setTimeout(() => {
                        setIsButtonDisabled(false)
                    }, TRANSITION_TIME * 1000)
                }} />
            <SliderDot data={data} onChange={setSliderDotIndex}
                currentSlideIndex={currentSlideIndex} />
        </div>
    )
}

export default Carousel