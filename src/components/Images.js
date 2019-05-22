import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import Image from './Image';
import InfiniteScroll from 'react-infinite-scroll-component';

const unsplash = new Unsplash({
  applicationId:
    '4524f904b900645cade11b7b292b54d28c6a04bc4ce5216937a317b78681dbf7',
  secret: 'e32bbe56c75d2d33ec4c085191e8a0f4f9b8a7dc4288b4ccd0f5d0e910f47efd'
});

class Images extends Component {
  state = {
    images: [],
    count: 30,
    start: 1
  };

  componentDidMount = () => {
    const { count, start } = this.state;
    fetch(
      `https://api.unsplash.com/photos?&count=${count}&start${start}`,
      unsplash.photos
        .listPhotos(1, 30)
        .then(toJson)
        .then(json => {
          this.setState({ images: json });
        })
    );
  };

  fetchImages = () => {
    this.setState({ start: this.state.start + this.state.count });
    const { count, start } = this.state;
    fetch(
      `https://api.unsplash.com/photos?&count=${count}&start${start}`,
      unsplash.photos
        .listPhotos(start, count)
        .then(toJson)
        .then(json => {
          this.setState({ images: this.state.images.concat(json) });
        })
    );
  };

  render() {
    const { images } = this.state;
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={
            <div className="ml-5">
              <div className="spinner-grow text-primary" role="status" />
              <div className="spinner-grow text-secondary" role="status" />

              <div className="spinner-grow text-dark" role="status" />

              <div className="spinner-grow text-danger" role="status" />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {images.map(image => (
            <Image key={image.id} image={image} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Images;
