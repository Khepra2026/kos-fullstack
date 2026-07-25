FROM golang:1.21-alpine
WORKDIR /app
COPY..
RUN go mod init kos/vcp
RUN go build -o vcp.
CMD ["./vcp"]
