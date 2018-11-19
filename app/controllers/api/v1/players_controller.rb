# frozen_string_literal: true

class Api::V1::PlayersController < ApplicationController
  before_action :set_player, only: %i[show update destroy]

  # GET /players
  def index
    @players = Player.all

    render json: @players
  end

  # GET /players/1
  def show
    render json: @player
  end

  # POST /players
  def create
    @player = Player.new(player_params)
    if player_params[:result] == 'win'
      @player.wins += 1
    elsif player_params[:result] == 'loss'
      @player.losses += 1
    elsif player_params[:result] == 'draw'
      @player.draws += 1
    end

    if @player.save
      render json: @player, status: :created, location: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /players/1
  def update
    @player = Player.find_by(name: player_params[:name])
    if(@player.nil?)
      @player = Player.new(player_params[:name])
    end

    if player_params[:result] == 'win'
      @player.wins += 1
    elsif player_params[:result] == 'loss'
      @player.losses += 1
    elsif player_params[:result] == 'draw'
      @player.draws += 1
    end
    if @player.save
      render json: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /players/1
  def destroy
    @player.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_player
    @player = Player.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def player_params
    params.require(:player).permit(:name, :result)
  end
end
