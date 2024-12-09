
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Book = () => {
    const { id } = useParams(); // Obtém o ID do livro a partir da URL
    const [book, setBook] = useState(null); // Estado para armazenar os dados do livro
    const [error, setError] = useState(null); // Estado para armazenar erros

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/id/${id}`,{
                    headers: { 
                        'Accept': 'application/json' 
                      }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados do livro.');
                }
                const data = await response.json();
                setBook(data[0]); // A API retorna um array, pega o primeiro item
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBookData();
    }, [id]);

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!book) {
        return <div>Carregando...</div>;
    }

    const bookInfo = book.info[0]; // Detalhes do livro
    const comments = book.comms; // Comentários do livro

    return (
        <div className="container mt-5">
            <h1>Detalhes do Livro</h1>
            <div className="text-center">
                <img
                    src={bookInfo.thumbnailUrl}
                    alt="Capa do Livro"
                    style={{
                        width: '200px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>
            <p><strong>ID:</strong> {bookInfo._id}</p>
            <p><strong>Título:</strong> {bookInfo.title}</p>
            <p><strong>ISBN:</strong> {bookInfo.isbn}</p>
            <p><strong>Número de Páginas:</strong> {bookInfo.pageCount}</p>
            <p><strong>Data de Publicação:</strong> {new Date(bookInfo.publishedDate).toLocaleDateString()}</p>
            <p><strong>Descrição Curta:</strong> {bookInfo.shortDescription}</p>
            <p><strong>Descrição Longa:</strong> {bookInfo.longDescription}</p>
            <p><strong>Estado:</strong> {bookInfo.status}</p>
            <p><strong>Autor(es):</strong> {bookInfo.authors.join(', ')}</p>
            <p><strong>Categoria(s):</strong> {bookInfo.categories.join(', ')}</p>
            <p><strong>Preço:</strong> ${bookInfo.price.toFixed(2)}</p>
            <p><strong>Pontuação Média:</strong> {book.avg_score.toFixed(2)}</p>

            <h2>Comentários</h2>
            {comments && comments.length > 0 ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            {comment}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum comentário disponível.</p>
            )}
        </div>
    );
};

export default Book;
