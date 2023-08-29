import React from 'react'
import SCREENS from './constants/pages.js'
import FadeToBlack from './components/layout/fadeToBlack.jsx'

export default function MyNavigator(props) {
    const children = React.useRef(props.children)
    const currentScreen = React.useRef( props.default )

    const [PageRef, setPageRef] = React.useState()
    const [loaded, setLoaded] = React.useState(false)

    const finishLoading = () => {
        setLoaded(true)
    }

    const changePage = (Screen) =>{
        setLoaded(false)
        currentScreen.current = Screen
        setPageRef(getPage())
    }

    const getPage = () =>{
        let Page = <h1>NOT FOUND</h1>
        children.current.forEach(element => {
            if(element.props.pageId == currentScreen.current){
                Page = React.cloneElement(element,{
                    ...element.props, 
                    finishLoading: finishLoading,
                    changePage: changePage
                })
            } 
        });

        return Page;
    }

    React.useEffect(()=>{   
        if(!currentScreen){
            currentScreen.current = children[0].props.pageId
        }
        setPageRef(getPage())
    },[])

  return (
        <div> 
            {getPage()}
        </div> 
    )
}
