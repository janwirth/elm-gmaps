// pull in desired CSS/SASS files
import './styles/main.scss'
import Elm from '../elm/Main'
import autoGmap from './map'

const rootEl = document.getElementById( 'main' )

Elm.Main.embed( rootEl );
autoGmap()
