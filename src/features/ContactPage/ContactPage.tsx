import React from 'react'
import { Button, ButtonGroup, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { ICounterReducer, INCREMENT_COUNTER, DECREMENT_COUNTER } from './counterReducer'
const ContactPage = () => {
    const dispatch = useDispatch()
    const { counter, title } = useSelector((state: ICounterReducer) => state)
    return (
        <>
            <Typography variant='h3'>{counter} , {title}</Typography>
            <ButtonGroup>
                <Button variant='contained' color="primary"
                    onClick={() => dispatch({ type: INCREMENT_COUNTER })}>افزایش عدد</Button>
                <Button variant='contained' color="secondary"
                    onClick={() => dispatch({ type: DECREMENT_COUNTER })}>کاهش عدد</Button>
            </ButtonGroup>
        </>
    )
}

export default ContactPage
