import React from 'react'
import {Typography} from '@material-ui/core'
import HeaderContainer from '../common/HeaderContainer'

const StreamingService = () => {
    return(
        <React.Fragment>
            <HeaderContainer />
            <Typography style ={{paddingTop: '3rem'}} color = "secondary" >개장 준비 중인 페이지 입니다</Typography>
        </React.Fragment>
    )
}

export default StreamingService