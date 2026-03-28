FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/DybyTechX/MEGALODON-MD.git /root/megalodon-md

# Set working directory
WORKDIR /root/megalodon-md

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 7860

# Start the bot
CMD ["npm", "start"]

