FROM denoland/deno:ubuntu-2.1.3

WORKDIR /app

ARG TZ=Europe/Berlin
ARG PUBLIC_HELLO

COPY . /app

RUN apt-get update && apt-get install -y --no-install-recommends curl tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && deno install --allow-scripts npm:@sveltejs/kit@2.8.3 \
    && deno install --allow-all -e import.ts \
    && deno task build \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["deno", "run", "--allow-all", "build/index.js"]