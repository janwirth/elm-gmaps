module Main exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )
import Debug

-- component import example
import Components.Hello exposing ( hello )


-- APP
main : Program Never Model Msg
main =
  Html.beginnerProgram { model = model, view = view, update = update }


-- MODEL
type alias Model = Int

model : Model
model = 1


-- UPDATE
type Msg = NoOp | Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    NoOp -> model
    Increment -> Debug.log "Model is now" (model + 1)
    Decrement -> Debug.log "Model is now" (model - 1)


mapEl _ = div [ class "gmap", style [] ] []

allMaps : Model -> List (Html msg)
allMaps model = List.map mapEl (List.range 0 (model - 1))
-- VIEW
-- Html is defined as: elem [ attribs ][ children ]
-- CSS can be applied via class names or inline style attrib
view : Model -> Html Msg
view model =
  div [ ] [
      h1 [onClick Increment] [ text "MOAR"]
    , h1 [onClick Decrement] [ text "LESS"]
    , div [] ( allMaps model )
  ]


-- CSS STYLES
styles : { img : List ( String, String ) }
styles =
  {
    img =
      [ ( "width", "33%" )
      , ( "border", "4px solid #337AB7")
      ]
  }
