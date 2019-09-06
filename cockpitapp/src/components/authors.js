import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './authors.module.css';
function Articles() {
    const [authors, updateAuthors] = useState([]);

    useEffect(() => {
        let url = `http://localhost:8090/api/collections/get/authors`;
        axios.get(url)
            .then(response => {
                updateAuthors(response.data.entries);
                console.log(response.data.entries);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <div>
            <div className={styles.container}>
                {authors.map(author => {
                    return <div className={styles.cardContent} key={author._id}>
                        <div className={styles.textContent}>
                            <div>
                                <h3 className={styles.authorName} >{author.name}</h3>
                            </div>
                            <div className={styles.authorArticles}>
                                <span>{author.articles.display}</span>
                                {/* {author.articles.map(articel => {
                                    // <span>{articel.display}</span>
                                })
                                } */}
                            </div>
                            <div className={styles.authorAvatar}>
                                <img className={styles.avatar} src={"http://localhost:8090/" + author.avatar.path} alt={author.name} />
                            </div>
                            <div className={styles.authorDecription}>
                                <span className={styles.authorDecriptionContent}>{author.description}</span>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    );
}

export default Articles;
