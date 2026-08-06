-- Manuell gegen die Postgres-DB auszufuehren (spring.jpa.hibernate.ddl-auto=none,
-- Hibernate legt keine Tabellen automatisch an).
--
-- Bewusste Entscheidung: KEINE separate users-Tabelle. Die bestehende (bislang leere)
-- schueler-Tabelle wird um Login-Felder erweitert und dient sowohl fuer Schueler als
-- auch fuer Lehrer als Account-Tabelle (role unterscheidet). So bleibt der Login direkt
-- mit dem Roster verzahnt, den der bestehende KI-Tutor-Workflow (aufgabenpool/
-- bewertungen/lehrstand) bereits nutzt. klasse bleibt fuer Lehrer-Accounts NULL.

ALTER TABLE schueler
    ADD COLUMN username      VARCHAR(64),
    ADD COLUMN email         VARCHAR(255),
    ADD COLUMN password_hash VARCHAR(255),
    ADD COLUMN role          VARCHAR(20),
    ADD COLUMN enabled       BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN created_at    TIMESTAMPTZ NOT NULL DEFAULT now();

-- Tabelle ist aktuell leer, daher risikolos nachtraeglich NOT NULL/CHECK/UNIQUE setzen.
ALTER TABLE schueler ALTER COLUMN username SET NOT NULL;
ALTER TABLE schueler ALTER COLUMN email SET NOT NULL;
ALTER TABLE schueler ALTER COLUMN password_hash SET NOT NULL;
ALTER TABLE schueler ALTER COLUMN role SET NOT NULL;

ALTER TABLE schueler ADD CONSTRAINT schueler_role_check CHECK (role IN ('STUDENT','TEACHER'));
ALTER TABLE schueler ADD CONSTRAINT uq_schueler_username UNIQUE (username);
ALTER TABLE schueler ADD CONSTRAINT uq_schueler_email UNIQUE (email);

-- bewertungen wird sowohl vom KI-Tutor-Workflow (aufgabenbezogen, teacher_id NULL) als
-- auch fuer manuell durch Lehrer vergebene Bewertungen (aufgabe_id/antwort NULL) genutzt.
ALTER TABLE bewertungen
    ADD COLUMN teacher_id INTEGER REFERENCES schueler(id) ON DELETE SET NULL;

-- Chatverlauf: komplett neue Tabelle, referenziert schueler als Login-/Account-Tabelle.
CREATE TABLE chat_messages (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER     NOT NULL REFERENCES schueler(id) ON DELETE CASCADE,
    session_id VARCHAR(64) NOT NULL,
    sender     VARCHAR(10) NOT NULL CHECK (sender IN ('STUDENT','AGENT')),
    text       TEXT        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_chat_messages_user_created ON chat_messages(user_id, created_at);
