import { Link } from 'react-router-dom';

const HomePageAdmin = () => {
  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/Forum" className="text-decoration-none">
            <div className="card h-100 shadow-sm rounded-4 text-center p-4 bg-light hover-shadow">
              <h5 className="mb-0 text-dark">Gerir Fórum</h5>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/queixas" className="text-decoration-none">
            <div className="card h-100 shadow-sm rounded-4 text-center p-4 bg-light">
              <h5 className="mb-0 text-dark">Queixas</h5>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/cursos" className="text-decoration-none">
            <div className="card h-100 shadow-sm rounded-4 text-center p-4 bg-light">
              <h5 className="mb-0 text-dark">Gerir Cursos</h5>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/utilizadores" className="text-decoration-none">
            <div className="card h-100 shadow-sm rounded-4 text-center p-4 bg-light">
              <h5 className="mb-0 text-dark">Gerir Utilizadores</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;
