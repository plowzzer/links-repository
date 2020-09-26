import React, { useState, useEffect } from "react";
import axios from "axios";

import Card, {CardLink} from "../components/Card";
import Loading from "../components/Loading";

export default function Home() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCards() {
      console.log('loadCards')
      const response = await axios.get('/api/listLinks')

      console.log(response)
      response.data && setCards(response.data)

      setLoading(false)
    }

    loadCards()
  }, [])

  return(
    <div className="container mx-auto">
      {loading && <Loading />}
      {cards.map(card => {
        return <Card
        url={card.url ? card.url : null}
        title={card.title ? card.title : null}
        description={card.description ? card.description: null}
        icon={card.icon ? card.icon: null}
        image={card.image ? card.image: null}
      />
      })}
    </div>
  )
}