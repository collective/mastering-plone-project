# syntax=docker/dockerfile:1
ARG VARNISH_VERSION=8.0
FROM varnish:${VARNISH_VERSION}

LABEL maintainer="Plone Community <collective@plone.org>" \
      org.label-schema.name="mastering-plone-project-varnish" \
      org.label-schema.description="Ploneconf Site Varnish image." \
      org.label-schema.vendor="Plone Community"

COPY etc/varnish.vcl /etc/varnish/default.vcl
