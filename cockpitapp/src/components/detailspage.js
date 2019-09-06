import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MDReactComponent from 'markdown-react-js';
import styles from "./detailspage.module.css"
function Detailspage(props) {
    const [articel, updateArticles] = useState(null);
    const { id } = props.match.params;


    useEffect(() => {
        axios.get(`http://localhost:8090/api/collections/get/articles/?filter[_id]=${id}`)
            .then(response => {
                updateArticles(response.data.entries[0]);
                console.log(response.data.entries);
                console.log("id   " + id);
            })
            .catch(error => console.log(error));
    }, []);

    if (!articel) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.cardContent}>

                    <div className={styles.textContent}>
                        <span className={styles.title}>{articel.title}</span>
                        <div className={styles.articelDescription}>
                            <span className={styles.author}><strong>By {articel.author.display}</strong></span>
                            <span className={styles.publishedOn}>{articel.published_on}</span>
                        </div>
                    </div>
                    <div className={styles.imgContent}>
                        <img className={styles.images} src={"http://localhost:8090/" + articel.img.path} alt={articel.name} />
                    </div>
                    <div className={styles.bodyContent}>
                    <MDReactComponent className={styles.articelBody} text={articel.body} /> 
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Detailspage;