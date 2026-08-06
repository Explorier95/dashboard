-- Zielt auf n8n-vector. Manuell ausfuehren, ddl-auto=none.
--
-- used_hint: ob der Schueler bei dieser Bewertung eine Hilfestellung genutzt hat.
-- Aktuell schreibt weder unser Backend automatisch noch der n8n-Workflow einen Wert
-- hierhin - die Spalte ist bewusst nullable (NULL = unbekannt, nicht "nein"), damit sie
-- fuer zukuenftiges Tracking bereitsteht, ohne Bestandsdaten falsch zu interpretieren.
ALTER TABLE bewertungen ADD COLUMN used_hint BOOLEAN;
