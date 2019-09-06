import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Pagination from "react-hooks-paginator";
import styles from './articles.module.css';
function Articles() {
    const pageLimit = 2;

    const [articles, updateArticles] = useState([]);
    const [inputRef, updateinputRef] = useState([]);
    const [sortRef, updateSortRef] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    
    useEffect(() => {
        const limit = 2;
        const skip = limit * (currentPage - 1);
        let url = `http://localhost:8090/api/collections/get/articles?sort[${sortRef}]=1&filter[title][$regex]=${inputRef}&limit=${limit}&skip=${skip}`;
        axios.get(url)
            .then(response => {
                setTotalArticles(response.data.total);
                updateArticles(response.data.entries);
                console.log(response.data.entries);
            })
            .catch(error => console.log(error));
    }, [inputRef, sortRef, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [inputRef]);


    return (
        <div className={styles.articlesContent}>
            <div className={styles.filtering}>
                <div className={styles.selectSort}>
                    <span> About {articles.length} results </span>
                    <span> Sort By </span>
                    <select onChange={e => updateSortRef(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="published_on">Date</option>
                    </select>
                </div>
                <div className={styles.search}>
                    <input
                        type="text"
                        className="input"
                        value={inputRef}
                        onChange={e => updateinputRef(e.target.value)}
                        placeholder="Search..." />
                </div>
            </div>
            <div className={styles.container}>
                {articles.map(articel => {
                    return <div className={styles.cardContent} key={articel._id}>
                        <div className={styles.imgContent}>
                            <img className={styles.images} src={"http://localhost:8090/" + articel.img.path} alt={articel.name} />
                        </div>
                        <div className={styles.textContent}>
                            <Link className={styles.title} to={"/detailspage/" + articel._id}>{articel.title}</Link>
                            <span className={styles.shortDecription}>{articel.short_description}</span>
                            <div className={styles.articelDescription}>
                                <span className={styles.author}> By<strong> {articel.author.display}</strong></span>
                                <span className={styles.publishedOn}>{articel.published_on}</span>
                            </div>
                        </div>
                    </div>

                })
                }
            </div>
            <Pagination
                totalRecords={totalArticles}
                pageLimit={pageLimit}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default Articles;
