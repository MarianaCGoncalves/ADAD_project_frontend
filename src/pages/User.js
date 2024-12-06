import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const User = () => {
    const { id } = useParams(); // Obtém o ID do utilizador a partir da URL
    const navigate = useNavigate(); // Hook para navegação
    const [user, setUser] = useState(null); // Estado para armazenar os dados do utilizador
    const [error, setError] = useState(null); // Estado para armazenar erros
    const [imageUrl, setImageUrl] = useState(''); // URL da imagem gerada aleatoriamente

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados do utilizador.');
                }
                const data = await response.json();
                setUser(data[0]); // A API retorna um array, pega o primeiro item
            } catch (err) {
                setError(err.message);
            }
        };

        // Gera a URL de uma imagem aleatória
        const generateRandomImage = () => {
            setImageUrl('https://thispersondoesnotexist.com');
        };

        fetchUserData();
        generateRandomImage();
    }, [id]);

    const deleteUser = async () => {
        if (window.confirm('Tem certeza que deseja eliminar este utilizador?')) {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erro ao eliminar o utilizador.');
                }

                alert('Utilizador eliminado com sucesso!');
                navigate('/users'); // Redireciona para a página principal
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Detalhes do Utilizador</h1>
            <div className="text-center">
                <img
                    src={imageUrl}
                    alt="Pessoa aleatória"
                    style={{ width: '200px', borderRadius: '50%', marginBottom: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                />
            </div>
            <p><strong>ID:</strong> {user._id}</p>
            <p><strong>Nome:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Ano de Nascimento:</strong> {user.year_of_birth}</p>
            <p><strong>Profissão:</strong> {user.job}</p>
            <h2>Avaliações</h2>
            {user.reviews && user.reviews.length > 0 ? (
                <ul>
                    {user.reviews.map((review, index) => (
                        <li key={index}>
                            <p><strong>ID do Livro:</strong> {review.book_id}</p>
                            <p><strong>Pontuação:</strong> {review.score}</p>
                            <p><strong>Recomendação:</strong> {review.recommendation ? 'Sim' : 'Não'}</p>
                            <p><strong>Data da Avaliação:</strong> {new Date(parseInt(review.review_date)).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma avaliação encontrada.</p>
            )}
            <div className="mt-4 text-center">
                <button className="btn btn-danger" onClick={deleteUser}>
                    Eliminar Utilizador
                </button>
            </div>
        </div>
    );
};

export default User;
