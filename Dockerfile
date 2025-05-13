FROM node:22
WORKDIR "/opt/movie-explorer"
COPY . ./
EXPOSE "3000"
CMD ["sleep", "infinity"]