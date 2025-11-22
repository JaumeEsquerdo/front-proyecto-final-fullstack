import { Link, useNavigate } from "react-router-dom";
import "@/css/pages/home.css";
import { useEffect, useState } from "react";
// import { color } from "framer-motion";
import { useActivity } from "@/context/ActivityContext";
import {
  ActivityCard,
  ActivityFilters,
  PackCard,
  PackDetails,
} from "@/components/home/HomeSections";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
//import { preload } from "react-dom";
// import { verificarLogin } from "@/components/utiles/Auth";

const Home = () => {
  const [verTodas, setVertodas] = useState(false); //para ver solo unas pocas act recomendadas o verlas todas
  const [packAbierto, setPackAbierto] = useState(null); // para abrir el pack segun su indice

  const { setIsAddFormOpen, setPreloadData, preloadData } = useActivity();

  const [actividades, setActividades] = useState([]); // para guardar las acts que llegan d la API
  const [listaDePacks, setListaDePacks] = useState([]); // par aguardar los packs

  const [loadingAct, setLoadingAct] = useState(true); // loding para act
  const [loadingPack, setLoadingPack] = useState(true); // loading para pack
  const [errorAct, setErrorAct] = useState(null); // para errores de acts
  const [errorPacks, setErrorPacks] = useState(null); // para errores de packs
  const navigate = useNavigate();

  const tipos = [
    // para filtrar cuando esté activo verTodas
    { nombre: "Todas", valor: "" },
    { nombre: "Naturaleza", valor: "naturaleza" },
    { nombre: "Cultural", valor: "cultural" },
    { nombre: "Playa", valor: "playa" },
    { nombre: "Deporte", valor: "deporte" },
    { nombre: "Gastronomía", valor: "gastronomia" },
    { nombre: "Ocio", valor: "ocio" },
  ];

  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const token = localStorage.getItem("token"); // importante, ponerlo fuera para q se actualice de forma general y asi afectar a ambos useEffect

  const API_URL = import.meta.env.VITE_API_URL;
  const API_ROUTER = import.meta.env.VITE_API_ROUTER;
  const API_ACTIVIDADES_PUBLIC = import.meta.env.VITE_API_ACTIVIDADES_PUBLIC;
  const API_PACKS = import.meta.env.VITE_API_PACKS;

  const actividadesMostradas = verTodas ? actividades : actividades.slice(0, 6); // para solo ver las 6 primeras actividades recomendadas

  // handle para poner el tipo clickado
  const handleFiltroTipo = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  const actividadesFiltradas = tipoSeleccionado
    ? actividadesMostradas.filter((act) => act.tipo === tipoSeleccionado)
    : actividadesMostradas;

  // useEffect para traer todas las actividades recomendadas
  useEffect(() => {
    const cachedActividades = localStorage.getItem("actividades");
    if (cachedActividades) {
      setActividades(JSON.parse(cachedActividades));
      setLoadingAct(false);
      return;
    }

    const fetchActividades = async () => {
      if (!token) return;
      try {
        const res = await fetch(
          `${API_URL}${API_ROUTER}${API_ACTIVIDADES_PUBLIC}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setErrorAct(data.msg || " error al obtener las actividades");
          return;
        }

        setActividades(data.data);

        // las guardo en cache para no tener que volver a pedirlas al cambiar de pagina
        localStorage.setItem("actividades", JSON.stringify(data.data));
      } catch (e) {
        console.error("error en el fetch de actividades en home", e);
        setErrorAct("error en la conexión del servidor");
      } finally {
        setLoadingAct(false);
      }
    };

    fetchActividades();
  }, [token]);

  // useEffect(() => {
  //     console.log('actividades cargadas:', actividades);
  // }, [actividades]);

  //useEffect para la API de packs de acts recomendadas
  useEffect(() => {
    const cachedPacks = localStorage.getItem("packs");
    if (cachedPacks) {
      setListaDePacks(JSON.parse(cachedPacks));
      setLoadingPack(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPacksActividades = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}${API_ROUTER}${API_PACKS}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: signal,
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorPacks(data.msg || " error al obtener los packs");
          return;
        }

        setListaDePacks(data.data);

        //guardar en cache los packs
        localStorage.setItem("packs", JSON.stringify(data.data));
      } catch (e) {
        if (e.name === "AbortError") return; // 👈 Silenciar abort
        console.error("error en el fetch de packs en home", e);
        setErrorPacks("error en la conexión del servidor en el fetch de packs");
      } finally {
        setLoadingPack(false);
      }
    };

    fetchPacksActividades();

    return () => {
      controller.abort(); // para cancelar la solicitud si el componente se desmonta
    };
  }, [token]);

  // para que al cambiar de pagina empiece la otra pagina desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Ver todas las actividades o una muestra */
  const handleActividades = () => {
    setVertodas(!verTodas);
  };

  /* ABRIR 1 pack / CERRAR los otros */
  const handleAbrirPack = (i) => {
    setPackAbierto((prev) => (prev === i ? null : i));
  };

  /* Agregar actividad al Calendario desde home*/
  const handleAgregarACalendario = (actividad) => {
    // IMPORTANTE!!! al tener dos maps (dos secciones de actividades), los maps tienen q pasar el mismo nombre "actividad", si no no funciona

    //verfico primero si esta logeado
    // const isLogged = verificarLogin(navigate);
    // if (!isLogged) return;

    setPreloadData({
      title: actividad.titulo,
      description: actividad.descripcion,
    });
    // console.log('handle preload en home', preloadData)
    setIsAddFormOpen(true); // poner en true el isAddFormOpen para que se active el useEffect en Calendario
    navigate("/calendario");
  };

  //   if (loadingPack) return <SkeletonPack />;
  //   if (loadingAct) return <SkeletonActivity />;
  if (errorAct) return <p>Error en actividades : {errorAct}</p>;
  if (errorPacks) return <p>Error en packs : {errorPacks}</p>;

  return (
    <>
      <div className="Home">
        <h1 className="Home-h1">Planifica tu visita a Villajoyosa</h1>

        {/* sección act recomendadas */}
        <section className="Act-section">
          <h2 className="Act-h2">Packs de recomendaciones</h2>
          {listaDePacks.length == 0 ? (
            <p className="Act-p">Cargando packs...</p>
          ) : (
            <p className="Act-p">{listaDePacks.length} packs</p>
          )}

          <div className="Act-cardScroll">
            <AnimatePresence>
              {loadingPack
                ? Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: "220px",
                        maxWidth: "220px",
                        height: "220px",
                      }}
                    >
                      <Skeleton
                        width="100%"
                        height="100%"
                        baseColor="#FFEDC4"
                        highlightColor="#FFE5B0"
                        style={{ borderRadius: "67px 55px 33px 40px" }}
                      />
                    </motion.div>
                  ))
                : listaDePacks.map((pack, i) => (
                    <motion.div
                      key={pack._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PackCard
                        i={i}
                        pack={pack}
                        handleAbrirPack={handleAbrirPack}
                      />
                    </motion.div>
                  ))}
            </AnimatePresence>

            {packAbierto !== null && (
              <PackDetails
                listaDePacks={listaDePacks}
                packAbierto={packAbierto}
                actividades={actividades}
                setPackAbierto={setPackAbierto}
                handleAgregarACalendario={handleAgregarACalendario}
              />
            )}
          </div>
        </section>

        <section className="Activities">
          <div className="Activities-titles">
            <h2 className="Activities-title">Más actividades recomendadas</h2>

            <p style={{ marginLeft: "0" }} className="Act-p">
              {actividadesMostradas.length} actividades
            </p>

            <Link className="Activities-more" onClick={handleActividades}>
              {verTodas ? "Ver menos" : "Ver todas"}
            </Link>
          </div>

          {verTodas && (
            <ActivityFilters
              tipos={tipos}
              tipoSeleccionado={tipoSeleccionado}
              handleFiltroTipo={handleFiltroTipo}
            />
          )}

          <div className="Activities-layout">
            <AnimatePresence>
              {loadingAct
                ? Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        height: "150px",
                        width: "350px",
                      }}
                    >
                      <Skeleton
                        width="100%"
                        height="100%"
                        baseColor="#FFEDC4"
                        highlightColor="#FFE5B0"
                        style={{ borderRadius: "20px" }}
                      />
                    </motion.div>
                  ))
                : actividadesFiltradas.map((actividad) => (
                    <motion.div
                      key={actividad._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActivityCard
                        actividad={actividad}
                        handleAgregarACalendario={handleAgregarACalendario}
                      />
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
