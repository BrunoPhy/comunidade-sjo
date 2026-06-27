import React, { useState, useEffect, useRef } from "react";
import {
  DoorOpen, BookOpen, Sparkles, HeartHandshake, Church, Bell,
  Droplets, HandHeart, Camera, HandCoins, PartyPopper,
  ArrowRight, ArrowLeft,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  ÍCONES PRÓPRIOS (desenhados sob medida — não existem na biblioteca)
 * ------------------------------------------------------------------ */
function IconCalice({ size = 24, strokeWidth = 1.5, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="4.3" r="2.4" />
      <path d="M12 2.6v3.4M10.3 4.3h3.4" />
      <path d="M7.2 9h9.6" />
      <path d="M7.6 9c.3 3.1 2 5.2 4.4 5.2S16.1 12.1 16.4 9" />
      <path d="M12 14.2v3.6" />
      <path d="M8.6 18.4c0-.6 1.5-1 3.4-1s3.4.4 3.4 1" />
      <path d="M8.4 18.6h7.2" />
    </svg>
  );
}

function IconTerco({ size = 24, strokeWidth = 1.5, className }) {
  const cx = 12, cy = 8, r = 4.6, n = 11;
  const beads = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return (
      <circle key={i} cx={(cx + r * Math.cos(a)).toFixed(2)}
        cy={(cy + r * Math.sin(a)).toFixed(2)} r="0.95" fill="currentColor" stroke="none" />
    );
  });
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      {beads}
      <circle cx="12" cy="12.6" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15.4" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17.4" r="0.85" fill="currentColor" stroke="none" />
      <path d="M12 18.3v3.4M10.5 19.7h3" />
    </svg>
  );
}

function IconIdoso({ size = 24, strokeWidth = 1.5, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="10" cy="3.8" r="2" />
      <path d="M10 5.8c-.7 1.3-1 2.8-.8 4.3l.3 2" />
      <path d="M9.5 12.1 8.1 19" />
      <path d="M9.5 12.1 11.4 18.8" />
      <path d="M9.5 8.2c1.3.2 2.5.9 3.4 1.9" />
      <path d="M13.6 9.1c.9-.2 1.6.3 1.7 1.3" />
      <path d="M15.3 10.4 15.6 19.2" />
    </svg>
  );
}

function IconVassouraMartelo({ size = 24, strokeWidth = 1.5, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M9 8.2 16.3 16.2" />
      <rect x="5.9" y="5.4" width="5.2" height="2.5" rx="0.6" fill="currentColor" stroke="none"
        transform="rotate(-45 8.5 6.65)" />
      <path d="M15 8.2 9.2 14.6" />
      <path d="M7 13 11 16.6" />
      <path d="M6.9 13.4 5 19.4 M8.4 14.7 7.4 20.2 M9.9 16 9.7 20.4 M11 16.7 11.8 19.6" />
    </svg>
  );
}



/* ------------------------------------------------------------------ *
 *  DADOS DA COMUNIDADE
 *  Tudo o que muda no dia a dia está aqui. Para manter o site,
 *  basta editar este objeto e a lista de pastorais abaixo.
 * ------------------------------------------------------------------ */
const COMUNIDADE = {
  nome: "São José Operário",
  nomeCompleto: "Comunidade São José Operário",
  // Redes da comunidade (troque pelos links reais)
  whatsapp: "5511966478060",
  instagram: "https://www.instagram.com/comunidadesaojoseoperarioo/",
};

/* Cada pastoral usa a mesma estrutura — adicionar uma nova é só
 * acrescentar um objeto nesta lista. Troque `representantes` e `whatsapp`
 * pelos contatos reais, e preencha `foto` quando tiver a imagem. */
const PASTORAIS = [
  {
    id: "acolhida",
    nome: "Pastoral da Acolhida",
    icon: DoorOpen,
    foto: null,
    sobre:
      "É o primeiro sorriso de quem chega. Recebe as pessoas nas missas e celebrações, entrega o folheto, indica um lugar e ajuda todos a se sentirem em casa na comunidade.",
    participar:
      "Pessoas comunicativas e acolhedoras, com disposição para servir nos fins de semana. Não exige experiência — só vontade de bem receber.",
    representantes: [],
    whatsapp: "5511966478060",
  },
  {
    id: "catequese",
    nome: "Catequese",
    icon: BookOpen,
    foto: null,
    sobre:
      "Acompanha crianças, jovens e adultos na preparação para os sacramentos, ensinando com carinho os fundamentos da fé e ajudando cada um a conhecer Jesus.",
    participar:
      "Quem tem fé viva e gosta de ensinar. Há formação para quem deseja se tornar catequista.",
    representantes: ["Alderi"],
    whatsapp: "5511966478060",
  },
  {
    id: "juventude",
    nome: "Pastoral da Juventude",
    icon: Sparkles,
    foto: null,
    sobre:
      "Reúne os jovens para crescerem na fé, na amizade e no serviço, mostrando que dá para ser jovem e seguir a Cristo com alegria.",
    participar:
      "Jovens que querem viver a fé em comunidade, fazer amizades e se envolver na vida da Igreja.",
    representantes: ["Bruno", "Layani"],
    whatsapp: "5511966478060",
  },
  {
    id: "familiar",
    nome: "Pastoral Familiar",
    icon: HeartHandshake,
    foto: null,
    sobre:
      "Caminha ao lado dos casais e das famílias, fortalecendo o amor, o diálogo e a fé dentro de casa.",
    participar:
      "Casais e pessoas que desejam cuidar e apoiar as famílias da comunidade.",
    representantes: ["Valcir", "Edivânia"],
    whatsapp: "5511966478060",
  },
  {
    id: "terco-familias",
    nome: "Movimento Terço das Famílias",
    icon: IconTerco,
    foto: null,
    tipo: "Movimento",
    sobre:
      "Um movimento que leva a oração do terço para dentro dos lares. As famílias se reúnem para rezar juntas e, ao longo do encontro, vivem também um seminário de vida, crescendo na fé e na união familiar.",
    participar:
      "Todas as pessoas que desejem rezar o terço conosco e fortalecer a fé no dia a dia de sua família. Basta abrir as portas e o coração. (Toda terça às 19h30)",
    representantes: ["Valcir"],
    whatsapp: "5511966478060",
  },
  {
    id: "liturgia",
    nome: "Pastoral da Liturgia",
    icon: Church,
    foto: null,
    sobre:
      "Prepara e cuida de cada celebração — leituras, cantos, ambiente e símbolos — para que a missa seja vivida com beleza e profundidade.",
    participar:
      "Pessoas atentas e organizadas, que amam a liturgia e gostam de servir nos detalhes da celebração.",
    representantes: ["Alderi", "Edivânia", "Célia"],
    whatsapp: "5511966478060",
  },
  {
    id: "coroinhas",
    nome: "Coroinhas e Acólitos",
    icon: Bell,
    foto: null,
    sobre:
      "Servem junto ao altar durante as celebrações, ajudando o sacerdote e aprendendo desde cedo a amar a missa.",
    participar:
      "Crianças, adolescentes e adultos que desejam servir ao altar com reverência e alegria.",
    representantes: ["Aline", "Bruno"],
    whatsapp: "5511966478060",
  },
  {
    id: "ministros",
    nome: "Ministros da Eucaristia",
    icon: IconCalice,
    foto: null,
    sobre:
      "Distribuem a Sagrada Comunhão nas celebrações e a levam aos doentes e idosos, com fé e reverência.",
    participar:
      "Pessoas de vida cristã madura, indicadas pela comunidade e preparadas para esse serviço.",
    representantes: ["Delciane", "Elza", "Valdelice"],
    whatsapp: "5511966478060",
  },
  {
    id: "batismo",
    nome: "Pastoral do Batismo",
    icon: Droplets,
    foto: null,
    sobre:
      "Acolhe e prepara as famílias e padrinhos para o batismo das crianças, esse primeiro grande passo da vida cristã.",
    participar:
      "Pessoas acolhedoras que gostam de orientar e caminhar com novas famílias.",
    representantes: ["Evanilde", "Zenilda"],
    whatsapp: "5511966478060",
  },
  {
    id: "caridade",
    nome: "Pastoral da Caridade",
    icon: HandHeart,
    foto: null,
    sobre:
      "Leva amor concreto a quem precisa: visita, escuta e ampara as pessoas em dificuldade, dentro e fora da comunidade.",
    participar:
      "Pessoas generosas e disponíveis para transformar a fé em gestos de cuidado com o próximo.",
    representantes: ["Ângela", "Evanilde"],
    whatsapp: "5511966478060",
  },
  {
    id: "pascom",
    nome: "Pastoral da Comunicação",
    icon: Camera,
    foto: null,
    sobre:
      "Cuida da comunicação da comunidade: divulga as celebrações e os eventos, registra os momentos em fotos e vídeos, mantém as redes sociais e ajuda a levar a Palavra para mais perto das pessoas.",
    participar:
      "Pessoas criativas que gostam de comunicação, redes sociais, fotografia ou design e querem usar esses dons a serviço da comunidade.",
    representantes: ["Bruno", "Layani", "Indira"],
    whatsapp: "5511966478060",
  },
  {
    id: "idoso",
    nome: "Pastoral do Idoso",
    icon: IconIdoso,
    foto: null,
    sobre:
      "Cuida dos idosos da comunidade com carinho, companhia e momentos de convivência, valorizando sua história e sua fé.",
    participar:
      "Pessoas pacientes e afetuosas, com tempo para visitar e acompanhar nossos idosos.",
    representantes: [],
    whatsapp: "5511966478060",
  },
  {
    id: "dizimo",
    nome: "Dízimo e Finanças",
    icon: HandCoins,
    foto: null,
    sobre:
      "Anima a comunidade a viver a partilha e cuida com transparência dos recursos que sustentam a vida e as obras da Igreja.",
    participar:
      "Quem deseja servir na organização e na sensibilização, com compromisso de discrição, ética, responsabilidade e transparência, e facilidade com números.",
    representantes: ["Delciane", "Almir"],
    whatsapp: "5511966478060",
  },
  {
    id: "limpeza",
    nome: "Limpeza e Zeladoria",
    icon: IconVassouraMartelo,
    foto: null,
    sobre:
      "Cuida para que a casa de Deus esteja sempre limpa, bonita e acolhedora para todas as celebrações.",
    participar:
      "Pessoas dispostas a servir com simplicidade, doando um pouco do seu tempo pela comunidade.",
    representantes: ["Andreia"],
    whatsapp: "5511966478060",
  },
  {
    id: "festa",
    nome: "Pastoral da Festa",
    icon: PartyPopper,
    foto: null,
    sobre:
      "Organiza as festas e celebrações da comunidade — como a festa do padroeiro — momentos de alegria, partilha e união entre todos.",
    participar:
      "Pessoas animadas e colaborativas, que gostam de organizar e celebrar em comunidade.",
    representantes: ["Valcir", "Cleonice", "Edivânia"],
    whatsapp: "5511966478060",
  },
];

/* ------------------------------------------------------------------ *
 *  ÍCONES DE MARCA (SVG próprios — logos não vêm da lib de ícones)
 * ------------------------------------------------------------------ */
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.9a7.86 7.86 0 0 0 1.06 3.95L4 20l4.28-1.12a7.94 7.94 0 0 0 3.76.96h.01a7.94 7.94 0 0 0 5.55-13.52ZM12.05 18.5h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.56 6.56 0 0 1-1-3.49 6.58 6.58 0 0 1 11.23-4.65 6.53 6.53 0 0 1 1.94 4.66 6.59 6.59 0 0 1-6.57 6.56Zm3.6-4.92c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.62.77-.12.13-.23.15-.42.05a5.4 5.4 0 0 1-1.59-.98 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.07-.6-1.46-.16-.39-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.62 0 .96.7 1.88.8 2.01.1.13 1.37 2.1 3.32 2.95.46.2.83.32 1.11.41.47.15.9.13 1.23.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.85.12-.94-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  );
}

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Emblem({ size = 40 }) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="Comunidade São José Operário"
      className="sjo-emblem"
    />
  );
}

/* Divisor litúrgico — losango dourado entre seções */
function Divider() {
  return (
    <div className="sjo-divider" aria-hidden="true">
      <span className="sjo-divider-line" />
      <span className="sjo-divider-mark" />
      <span className="sjo-divider-line" />
    </div>
  );
}

/* Link de WhatsApp com mensagem pré-preenchida */
function whatsappLink(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/* ------------------------------------------------------------------ *
 *  CABEÇALHO
 * ------------------------------------------------------------------ */
function Header({ onHome, onPastorais }) {
  return (
    <header className="sjo-header">
      <button className="sjo-brand" onClick={onHome} aria-label="Ir para o início">
        <Emblem size={40} />
        <span className="sjo-brand-text">
          <span className="sjo-brand-eyebrow">Comunidade</span>
          <span className="sjo-brand-name sjo-display">São José Operário</span>
        </span>
      </button>
      <nav className="sjo-nav" aria-label="Navegação principal">
        <button className="sjo-navlink" onClick={onHome}>Início</button>
        <button className="sjo-navlink" onClick={onPastorais}>Pastorais</button>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ *
 *  PLACEHOLDER DE FOTO (até existir imagem real)
 * ------------------------------------------------------------------ */
function PhotoBlock({ pastoral, large = false }) {
  const Icon = pastoral.icon;
  if (pastoral.foto) {
    return (
      <div className={large ? "sjo-photo sjo-photo-lg" : "sjo-photo"}>
        <img src={pastoral.foto} alt={pastoral.nome} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={large ? "sjo-photo sjo-photo-ph sjo-photo-lg" : "sjo-photo sjo-photo-ph"}>
      <Icon size={large ? 64 : 40} strokeWidth={1.4} className="sjo-photo-icon" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  CARD DE PASTORAL
 * ------------------------------------------------------------------ */
function PastoralCard({ pastoral, index, onOpen }) {
  return (
    <button
      className="sjo-card sjo-rise"
      style={{ animationDelay: `${0.04 * index}s` }}
      onClick={() => onOpen(pastoral.id)}
      aria-label={`Abrir ${pastoral.nome}`}
    >
      <div className="sjo-card-media">
        <PhotoBlock pastoral={pastoral} />
        {pastoral.tipo && <span className="sjo-badge">{pastoral.tipo}</span>}
      </div>
      <span className="sjo-card-name sjo-display">{pastoral.nome}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  PÁGINA INICIAL
 * ------------------------------------------------------------------ */
function Home({ onOpen, pastoraisRef, scrollToPastorais }) {
  return (
    <main>
      <section className="sjo-hero">
        <div className="sjo-hero-halo" aria-hidden="true" />
        <div className="sjo-hero-inner sjo-rise">
          <Emblem size={156} />
          <h1 className="sjo-hero-title sjo-display">
            Seja bem-vindo à Comunidade São José Operário
          </h1>
          <p className="sjo-hero-text">
            Conheça nossas pastorais e descubra onde você pode servir, crescer
            na fé e fazer parte da nossa comunidade.
          </p>
          <button className="sjo-btn sjo-btn-primary" onClick={scrollToPastorais}>
            Conheça nossas pastorais
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </section>

      <Divider />

      <section className="sjo-section" ref={pastoraisRef}>
        <h2 className="sjo-section-title sjo-display">Conheça nossas pastorais</h2>
        <p className="sjo-section-sub">
          Toque em uma pastoral para conhecer sua missão e fazer parte.
        </p>
        <div className="sjo-grid">
          {PASTORAIS.map((p, i) => (
            <PastoralCard key={p.id} pastoral={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 *  PÁGINA DA PASTORAL
 * ------------------------------------------------------------------ */
function PastoralPage({ pastoral, onBack }) {
  const mensagem = `Olá! Vim pelo site da Comunidade São José Operário e tenho interesse em ${pastoral.nome}.`;
  return (
    <main className="sjo-page sjo-rise">
      <button className="sjo-back" onClick={onBack}>
        <ArrowLeft size={18} strokeWidth={2} />
        Voltar para as pastorais
      </button>

      <PhotoBlock pastoral={pastoral} large />

      {pastoral.tipo && <p className="sjo-page-eyebrow">{pastoral.tipo}</p>}
      <h1 className="sjo-page-title sjo-display">{pastoral.nome}</h1>

      <Divider />

      <section className="sjo-block">
        <h2 className="sjo-block-title sjo-display">Sobre a pastoral</h2>
        <p className="sjo-block-text">{pastoral.sobre}</p>
      </section>

      <section className="sjo-block">
        <h2 className="sjo-block-title sjo-display">Quem pode participar?</h2>
        <p className="sjo-block-text">{pastoral.participar}</p>
      </section>

      {pastoral.representantes && pastoral.representantes.length > 0 ? (
        <section className="sjo-block">
          <h2 className="sjo-block-title sjo-display">Quem coordena</h2>
          <div className="sjo-team">
            {pastoral.representantes.map((r) => (
              <span className="sjo-team-chip" key={r}>{r}</span>
            ))}
          </div>
        </section>
      ) : (
        <section className="sjo-block">
          <h2 className="sjo-block-title sjo-display">Quer participar?</h2>
          <p className="sjo-block-text">
            Toque no botão abaixo para participar ou ajudar a organizar. Você é
            muito bem-vindo!
          </p>
        </section>
      )}

      <a
        className="sjo-btn sjo-btn-join"
        href={whatsappLink(pastoral.whatsapp, mensagem)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={24} />
        Faça parte desta pastoral
      </a>
      <p className="sjo-join-note">
        Você será direcionado ao WhatsApp da comunidade com uma mensagem pronta.
        É só enviar que entramos em contato e apresentamos você à equipe.
      </p>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 *  RODAPÉ
 * ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="sjo-footer">
      <Emblem size={58} />
      <p className="sjo-footer-name sjo-display">{COMUNIDADE.nomeCompleto}</p>
      <p className="sjo-footer-msg">Todos são bem-vindos.</p>
      <div className="sjo-social">
        <a
          className="sjo-social-link"
          href={whatsappLink(COMUNIDADE.whatsapp, "Olá! Vim pelo site da comunidade.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp da comunidade"
        >
          <WhatsAppIcon size={22} />
        </a>
        <a
          className="sjo-social-link"
          href={COMUNIDADE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da comunidade"
        >
          <InstagramIcon size={22} />
        </a>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 *  APP — navegação por estado (pronta para novas páginas no futuro:
 *  Horários das Missas, Agenda, Eventos, Sacramentos, História,
 *  Galeria, Contato — basta acrescentar rotas aqui e itens no menu.)
 * ------------------------------------------------------------------ */
export default function App() {
  const [route, setRoute] = useState({ name: "home" });
  const pastoraisRef = useRef(null);
  const topRef = useRef(null);

  const goHome = () => setRoute({ name: "home" });
  const openPastoral = (id) => setRoute({ name: "pastoral", id });

  // Ao trocar de página, volta ao topo
  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0 });
  }, [route]);

  const scrollToPastorais = () => {
    if (route.name !== "home") {
      goHome();
      // espera a home montar antes de rolar
      setTimeout(() => {
        pastoraisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      pastoraisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pastoralAtual =
    route.name === "pastoral" ? PASTORAIS.find((p) => p.id === route.id) : null;

  return (
    <div className="sjo-root">
      <style>{CSS}</style>
      <span ref={topRef} />
      <Header onHome={goHome} onPastorais={scrollToPastorais} />

      {route.name === "home" && (
        <Home
          onOpen={openPastoral}
          pastoraisRef={pastoraisRef}
          scrollToPastorais={scrollToPastorais}
        />
      )}

      {route.name === "pastoral" && pastoralAtual && (
        <PastoralPage pastoral={pastoralAtual} onBack={scrollToPastorais} />
      )}

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  ESTILOS
 * ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root{
  --paper:#FAF8F3;
  --paper-2:#F2EEE4;
  --white:#FFFFFF;
  --ink:#1B2A4A;
  --blue:#1E3A5F;
  --blue-deep:#15294A;
  --blue-soft:#41618E;
  --gold:#B89150;
  --gold-soft:#CBA86A;
  --gray:#5C6473;
  --gray-soft:#8B92A0;
  --line:rgba(184,145,80,0.28);
}

.sjo-root *{box-sizing:border-box;}
.sjo-root{
  font-family:'Inter',system-ui,-apple-system,sans-serif;
  color:var(--ink);
  background:var(--paper);
  min-height:100vh;
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.sjo-emblem{
  display:block;object-fit:contain;border-radius:50%;
  background:#FCFAF5;border:2px solid var(--gold);
  box-shadow:0 4px 14px -8px rgba(27,42,74,.35);
}
.sjo-display{font-family:'Cormorant','Georgia',serif;letter-spacing:0.2px;}

/* botões reset */
.sjo-root button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit;}
.sjo-root a{text-decoration:none;color:inherit;}

/* ---------- entrada suave ---------- */
@keyframes sjoRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
.sjo-rise{animation:sjoRise .6s cubic-bezier(.21,.7,.35,1) both;}

/* ---------- cabeçalho ---------- */
.sjo-header{
  position:sticky;top:0;z-index:20;
  display:flex;align-items:center;justify-content:space-between;
  gap:12px;padding:12px 18px;
  background:rgba(250,248,243,0.88);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line);
}
.sjo-brand{display:flex;align-items:center;gap:10px;min-width:0;}
.sjo-brand-text{display:flex;flex-direction:column;align-items:flex-start;line-height:1.05;min-width:0;}
.sjo-brand-eyebrow{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);font-weight:600;}
.sjo-brand-name{font-size:19px;font-weight:600;color:var(--blue);white-space:nowrap;}
.sjo-nav{display:flex;gap:6px;flex-shrink:0;}
.sjo-navlink{
  font-size:15px;font-weight:500;color:var(--gray);
  padding:8px 12px;border-radius:999px;transition:color .2s,background .2s;
}
.sjo-navlink:hover{color:var(--blue);background:var(--paper-2);}

/* ---------- hero ---------- */
.sjo-hero{position:relative;overflow:hidden;text-align:center;padding:54px 22px 40px;}
.sjo-hero-halo{
  position:absolute;top:-120px;left:50%;transform:translateX(-50%);
  width:520px;height:520px;border-radius:50%;
  background:radial-gradient(circle at center,
     rgba(203,168,106,0.20) 0%,
     rgba(65,97,142,0.10) 38%,
     rgba(250,248,243,0) 68%);
  pointer-events:none;
}
.sjo-hero-inner{position:relative;max-width:560px;margin:0 auto;display:flex;flex-direction:column;align-items:center;}
.sjo-hero-eyebrow{margin:18px 0 4px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:600;}
.sjo-hero-title{
  font-size:38px;line-height:1.12;font-weight:600;color:var(--blue);
  margin:24px 0 16px;max-width:9.5em;
}
.sjo-hero-text{font-size:18px;color:var(--gray);max-width:30em;margin:0 0 28px;}

/* ---------- botões ---------- */
.sjo-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-weight:600;border-radius:999px;transition:transform .18s,box-shadow .25s,background .25s;
}
.sjo-btn:active{transform:scale(.97);}
.sjo-root .sjo-btn-primary{
  font-size:17px;padding:15px 28px;color:#ffffff;
  background:var(--blue);box-shadow:0 8px 22px -8px rgba(30,58,95,0.55);
  border:1px solid var(--gold-soft);
}
.sjo-btn-primary:hover{background:var(--blue-deep);box-shadow:0 12px 28px -8px rgba(30,58,95,0.6);}

/* ---------- divisor ---------- */
.sjo-divider{display:flex;align-items:center;justify-content:center;gap:14px;padding:8px 22px;max-width:340px;margin:0 auto;}
.sjo-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent);}
.sjo-divider-mark{width:9px;height:9px;background:var(--gold);transform:rotate(45deg);border-radius:1.5px;flex-shrink:0;}

/* ---------- seção pastorais ---------- */
.sjo-section{padding:28px 18px 8px;max-width:760px;margin:0 auto;}
.sjo-section-title{font-size:30px;font-weight:600;color:var(--blue);text-align:center;margin:6px 0 6px;}
.sjo-section-sub{text-align:center;color:var(--gray);font-size:16px;margin:0 auto 26px;max-width:26em;}
.sjo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}

/* ---------- card ---------- */
.sjo-card{
  display:flex;flex-direction:column;text-align:left;
  background:var(--white);border:1px solid var(--line);border-radius:20px;
  overflow:hidden;box-shadow:0 4px 14px -10px rgba(27,42,74,0.3);
  transition:transform .2s ease,box-shadow .25s ease,border-color .25s;
}
.sjo-card:hover{transform:translateY(-4px);box-shadow:0 14px 26px -14px rgba(27,42,74,0.45);border-color:var(--gold-soft);}
.sjo-card:active{transform:translateY(-1px) scale(.99);}
.sjo-card-name{padding:13px 14px 15px;font-size:19px;font-weight:600;color:var(--blue);line-height:1.18;}

/* ---------- foto / placeholder ---------- */
.sjo-photo{aspect-ratio:4/3;width:100%;overflow:hidden;background:var(--paper-2);}
.sjo-photo img{width:100%;height:100%;object-fit:cover;display:block;}
.sjo-photo-ph{
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(150deg,var(--blue) 0%,var(--blue-soft) 100%);
  position:relative;
}
.sjo-photo-ph::after{
  content:"";position:absolute;inset:0;
  background:radial-gradient(circle at 30% 20%,rgba(255,255,255,0.14),transparent 55%);
}
.sjo-photo-icon{color:rgba(203,168,106,0.95);position:relative;z-index:1;}
.sjo-photo-lg{aspect-ratio:16/10;border-radius:24px;border:1px solid var(--line);}

/* ---------- página da pastoral ---------- */
.sjo-page{max-width:620px;margin:0 auto;padding:20px 20px 8px;}
.sjo-back{
  display:inline-flex;align-items:center;gap:7px;
  font-size:15px;font-weight:500;color:var(--blue-soft);
  padding:8px 0;margin-bottom:10px;transition:gap .2s,color .2s;
}
.sjo-back:hover{gap:11px;color:var(--blue);}
.sjo-page-title{font-size:34px;font-weight:600;color:var(--blue);text-align:center;margin:20px 0 4px;line-height:1.12;}
.sjo-block{margin:6px 0 22px;}
.sjo-block-title{font-size:24px;font-weight:600;color:var(--blue);margin:0 0 8px;}
.sjo-block-text{font-size:18px;color:var(--gray);margin:0;}\n.sjo-team{display:flex;flex-wrap:wrap;gap:9px;}\n.sjo-team-chip{font-size:16px;font-weight:600;color:var(--blue);background:#FFFFFF;border:1px solid var(--line);padding:8px 15px;border-radius:999px;}

.sjo-root .sjo-btn-join{
  width:100%;font-size:19px;font-weight:700;padding:18px 24px;margin-top:14px;color:#ffffff;
  background:var(--blue);box-shadow:0 10px 26px -8px rgba(30,58,95,0.55);
  border:1px solid var(--gold-soft);
}
.sjo-btn-join:hover{background:var(--blue-deep);box-shadow:0 14px 30px -8px rgba(30,58,95,0.6);}
.sjo-join-note{text-align:center;font-size:14px;color:var(--gray-soft);margin:12px 0 4px;}

/* ---------- rodapé ---------- */
.sjo-footer{
  margin-top:40px;padding:40px 22px 48px;text-align:center;
  background:var(--paper-2);border-top:1px solid var(--line);
  display:flex;flex-direction:column;align-items:center;gap:8px;
}
.sjo-footer-name{font-size:22px;font-weight:600;color:var(--blue);margin:6px 0 0;}
.sjo-footer-msg{font-size:16px;color:var(--gray);margin:0 0 8px;}
.sjo-social{display:flex;gap:14px;margin-top:4px;}
.sjo-social-link{
  display:flex;align-items:center;justify-content:center;width:46px;height:46px;
  border-radius:50%;color:var(--blue);background:var(--white);
  border:1px solid var(--line);transition:transform .18s,color .2s,box-shadow .25s;
}
.sjo-social-link:hover{transform:translateY(-2px);color:var(--gold);box-shadow:0 8px 18px -8px rgba(27,42,74,0.4);}

.sjo-card-media{position:relative;}
.sjo-badge{
  position:absolute;top:10px;left:10px;
  font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  color:#ffffff;background:var(--gold);
  padding:5px 11px;border-radius:999px;
  box-shadow:0 3px 10px -3px rgba(27,42,74,.5);
}
.sjo-page-eyebrow{
  text-align:center;margin:16px 0 0;
  font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--gold);
}
.sjo-page-eyebrow + .sjo-page-title{margin-top:6px;}

/* ---------- telas maiores ---------- */
@media (min-width:560px){
  .sjo-grid{grid-template-columns:repeat(3,1fr);gap:16px;}
  .sjo-hero-title{font-size:46px;}
}
@media (min-width:820px){
  .sjo-hero{padding:72px 22px 52px;}
  .sjo-hero-title{font-size:54px;}
}

/* ---------- acessibilidade: foco visível ---------- */
.sjo-root button:focus-visible,
.sjo-root a:focus-visible{
  outline:3px solid var(--gold-soft);outline-offset:3px;border-radius:14px;
}

/* ---------- respeita redução de movimento ---------- */
@media (prefers-reduced-motion:reduce){
  .sjo-rise{animation:none;}
  .sjo-card,.sjo-btn,.sjo-social-link,.sjo-back{transition:none;}
  .sjo-root *{scroll-behavior:auto !important;}
}
`;
